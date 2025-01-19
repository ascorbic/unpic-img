/** @jsxImportSource react */
import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { themes } from "prism-react-renderer";

interface CodeEditorProps {
  code: string;
  scope?: Record<string, unknown>;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  scope,
}): JSX.Element => {
  return (
    <div style={{ marginTop: "1em" }}>
      <LiveProvider
        code={code}
        scope={{ ...scope }}
        theme={themes.dracula}
        noInline
      >
        <label
          style={{
            position: "absolute",
            transform: "translateX(8px)",
            background: "#98C379",
            color: "black",
            zIndex: 100,
            padding: "0 1em",
            fontSize: "80%",
          }}
        >
          Edit me!
        </label>
        <LiveEditor />
        <LiveError />
        <div
          style={{
            resize: "horizontal",
            overflow: "auto",
            maxWidth: "100%",
            border: "1px gray solid",
            marginTop: "1em",
          }}
        >
          <label
            style={{
              position: "absolute",
              transform: "translateX(8px)",
              background: "#98C379",
              color: "black",
              zIndex: 100,
              padding: "0 1em",
              fontSize: "80%",
            }}
          >
            Preview
          </label>
          <LivePreview
            style={{
              display: "grid",
              placeItems: "center",
              gap: "1em",
              overflow: "initial",
              paddingBottom: "0.5em",
              background: "white",
            }}
          />
        </div>
      </LiveProvider>
    </div>
  );
};
