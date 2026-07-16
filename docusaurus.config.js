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
