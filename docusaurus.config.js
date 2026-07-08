// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'System Design Roadmap',
  tagline: '35 topics · 30 interview problems · Beginner to Advanced',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Update these two when you push to GitHub Pages:
  url: 'https://your-github-username.github.io',
  baseUrl: '/learn-notes/',

  organizationName: 'your-github-username',
  projectName: 'learn-notes',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
      },
      navbar: {
        title: 'System Design Roadmap',
        items: [
          { to: '/', label: 'Roadmap', position: 'left' },
          { to: '/docs/intro', label: 'How to Use', position: 'left' },
          {
            type: 'docSidebar',
            sidebarId: 'topicsSidebar',
            position: 'left',
            label: 'Topics',
          },
          {
            type: 'docSidebar',
            sidebarId: 'problemsSidebar',
            position: 'left',
            label: 'Problems',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Source Resources',
            items: [
              { label: 'Hello Interview', href: 'https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction' },
              { label: 'Gaurav Sen Playlist', href: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX' },
              { label: 'InterviewReady', href: 'https://interviewready.io/course-page/system-design-course' },
              { label: 'Hello Interview YouTube', href: 'https://www.youtube.com/@hello_interview/playlists' },
            ],
          },
        ],
        copyright: `Built for system design interview prep.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
