import { clientBootstrap, RouteModule } from "@impalajs/preact/client";

const modules = import.meta.glob<RouteModule>("./routes/**/*.{tsx,jsx}");

clientBootstrap(modules);
