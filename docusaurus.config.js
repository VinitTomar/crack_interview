// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Crack Interview",
  tagline: "HLD & LLD roadmaps for software engineering interviews",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  // Update these two when you push to GitHub Pages:
  url: "https://your-github-username.github.io",
  baseUrl: "/crack_interview/",

  organizationName: "your-github-username",
  projectName: "Crack Interview",
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
      /** @type {import('@docusaurus/preset-classic').Options} */
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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
      },
      navbar: {
        title: "Crack Interview",
        items: [
          { to: "/", label: "Home", position: "left" },
          { to: "/hld", label: "HLD Roadmap", position: "left" },
          { to: "/lld", label: "LLD Roadmap", position: "left" },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "HLD Resources",
            items: [
              {
                label: "Hello Interview: System Design",
                href: "https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction",
              },
              {
                label: "Gaurav Sen Playlist",
                href: "https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX",
              },
              {
                label: "InterviewReady",
                href: "https://interviewready.io/course-page/system-design-course",
              },
            ],
          },
          {
            title: "LLD Resources",
            items: [
              {
                label: "Hello Interview: OOD",
                href: "https://www.hellointerview.com/learn/code/object-oriented-design/introduction",
              },
              {
                label: "Refactoring.Guru",
                href: "https://refactoring.guru/design-patterns",
              },
              {
                label: "Grokking OO Design",
                href: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
              },
            ],
          },
        ],
        copyright: `Built for interview prep.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
