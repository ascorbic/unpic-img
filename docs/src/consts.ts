export const SITE = {
  title: "Unpic",
  description: "The best images for every framework",
  defaultLanguage: "en-us",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true",
    alt:
      "astro logo on a starry expanse of space," +
      " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "ascorbic",
};

export const GITHUB_EDIT_URL = `https://github.com/ascorbic/unpic-img/tree/main/docs`;

export const COMMUNITY_INVITE_URL = undefined; //`https://astro.build/chat`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};

export type Sidebar = Record<
  string,
  { text: string; link: string; icon?: string }[]
>;

export const SIDEBAR: Sidebar = {
  "unpic-img": [
    { text: "Introduction", link: "img" },
    { icon: "logos:angular-icon", text: "Angular", link: "img/angular" },
    { icon: "simple-icons:astro", text: "Astro", link: "img/astro" },
    { icon: "logos:preact", text: "Preact", link: "img/preact" },
    { icon: "qwik", text: "Qwik", link: "img/qwik" },
    { icon: "logos:react", text: "React", link: "img/react" },
    { icon: "logos:solidjs-icon", text: "SolidJS", link: "img/solid" },
    { icon: "logos:svelte-icon", text: "Svelte", link: "img/svelte" },
    { icon: "logos:vue", text: "Vue", link: "img/vue" },
    { icon: "eleventy", text: "WebC", link: "img/webc" },
  ],
  placeholder: [
    { text: "Docs", link: "placeholder" },
    { text: "Playground", link: "placeholder/playground" },
  ],
  "unpic lib": [
    { text: "Docs", link: "lib" },
    { text: "Contributing", link: "lib/contributing" },
  ],
  pixels: [
    { icon: "logos:deno", text: "Deno", link: "pixels/deno" },
    { icon: "cib:node-js", text: "Node", link: "pixels/node" },
  ],
  "og edge": [{ text: "Docs", link: "og-edge" }],
};
