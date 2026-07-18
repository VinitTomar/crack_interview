// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

const config = {
  title: "Buzz Interview",
  tagline: "HLD & LLD roadmaps for software engineering interviews",
  favicon: "img/logo.svg",

  future: {
    v4: true,
  },

  // Update these two when you push to GitHub Pages:
  url: "https://buzzinterview.com",
  baseUrl: "/",

  organizationName: "your-github-username",
  projectName: "buzz-interview",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "warn",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      ({
        docs: {
          sidebarPath: "./sidebars.js",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig: ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
      },
      navbar: {
        logo: {
          alt: 'Buzz Interview',
          src: 'img/logo.svg',
        },
        title: "Buzz Interview",
        items: [
          { to: "/hld", label: "HLD Roadmap", position: "left" },
          { to: "/lld", label: "LLD Roadmap", position: "left" },
        ],
      },
      footer: {
        style: "light",
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
