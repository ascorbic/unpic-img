import {
  createIPX,
  createIPXWebServer,
  ipxFSStorage,
  ipxHttpStorage,
} from "ipx";

import { tmpdir } from "node:os";
import { join } from "node:path";

const ipx = createIPX({
  httpStorage: ipxHttpStorage({
    domains: ["placekitten.com"],
  }),
  storage: ipxFSStorage({ dir: join(tmpdir(), "ipx") }),
});

const server = createIPXWebServer(ipx);

export default function handler(request: Request, context) {
  const url = new URL(request.url);
  url.pathname = url.pathname.replace(/^\/_ipx/, "");

  return server(new Request(url, request), context);
}

export const config = {
  path: "/_ipx/*",
};
