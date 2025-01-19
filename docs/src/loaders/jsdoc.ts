import * as ts from "typescript";

export interface DocEntry {
  name: string;
  documentation: string;
  type: string;
}

export class JSDocExtractor {
  private program: ts.Program;
  private typeChecker: ts.TypeChecker;
  private debug: boolean;

  constructor(entryFile: string, debug = false) {
    this.debug = debug;

    // Create program with full module resolution
    this.program = ts.createProgram({
      rootNames: [entryFile],
      options: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        resolveJsonModule: true,
        allowJs: true,
        esModuleInterop: true,
      },
    });

    this.typeChecker = this.program.getTypeChecker();

    if (this.debug) {
      const sourceFiles = this.program.getSourceFiles();
      console.log(`Found ${sourceFiles.length} source files`);
    }
  }

  private log(message: string) {
    if (this.debug) console.log(message);
  }

  public extractType(typePath: string): DocEntry[] {
    // Parse the type path into segments and index access
    const matches = typePath.match(/^([\w.]+)(?:\['([^']+)'\])?$/);
    if (!matches) return [];

    const [_, basePath, indexAccess] = matches;
    const parts = basePath.split(".");

    // Find the base symbol
    let symbol: ts.Symbol | undefined;

    // Search in all source files
    for (const sourceFile of this.program.getSourceFiles()) {
      if (sourceFile.isDeclarationFile) continue;

      const moduleSymbol = this.typeChecker.getSymbolAtLocation(sourceFile);
      if (!moduleSymbol) continue;

      // Look for the symbol through the path
      let currentSymbol = this.findSymbolInExports(moduleSymbol, parts[0]);
      if (!currentSymbol) continue;

      // Navigate through the path
      for (let i = 1; i < parts.length; i++) {
        if (currentSymbol.flags & ts.SymbolFlags.Module) {
          const exports = this.typeChecker.getExportsOfModule(currentSymbol);
          currentSymbol = exports.find((exp) => exp.getName() === parts[i]);
        } else {
          const type = this.typeChecker.getTypeOfSymbolAtLocation(
            currentSymbol,
            currentSymbol.valueDeclaration!,
          );
          const property = type.getProperty(parts[i]);
          if (property) {
            currentSymbol = property;
          }
        }
        if (!currentSymbol) break;
      }

      if (currentSymbol) {
        symbol = currentSymbol;
        break;
      }
    }

    if (!symbol) {
      this.log(`Could not find type: ${typePath}`);
      return [];
    }

    // Get the type of the base symbol
    let type = this.typeChecker.getDeclaredTypeOfSymbol(symbol);

    // If there's an index access, look up that property
    if (indexAccess) {
      const indexType = type.getProperty(indexAccess);
      if (indexType) {
        type = this.typeChecker.getTypeOfSymbolAtLocation(
          indexType,
          indexType.valueDeclaration!,
        );
      } else {
        this.log(`Could not find index: ${indexAccess}`);
        return [];
      }
    }

    // Extract properties
    const properties = this.typeChecker.getPropertiesOfType(type);
    return properties.map((prop) => ({
      name: prop.getName(),
      documentation: ts.displayPartsToString(
        prop.getDocumentationComment(this.typeChecker),
      ),
      type: this.typeChecker.typeToString(
        this.typeChecker.getTypeOfSymbolAtLocation(
          prop,
          prop.valueDeclaration!,
        ),
      ),
    }));
  }

  private findSymbolInExports(
    moduleSymbol: ts.Symbol,
    name: string,
  ): ts.Symbol | undefined {
    if (moduleSymbol.flags & ts.SymbolFlags.Module) {
      return this.typeChecker
        .getExportsOfModule(moduleSymbol)
        .find((exp) => exp.getName() === name);
    }
    return undefined;
  }
}
