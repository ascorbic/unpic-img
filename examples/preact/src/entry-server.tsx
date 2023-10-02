import type { RouteModule, DataModule } from "@impalajs/preact";
export { render } from "@impalajs/preact";
export const routeModules = import.meta.glob<RouteModule>(
  "./routes/**/*.{tsx,jsx}"
);
export const dataModules = import.meta.glob<DataModule>(
  "./routes/**/*.data.{ts,js}"
);
