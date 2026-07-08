// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  topicsSidebar: [
    {
      type: 'category',
      label: 'Easy — Foundational',
      items: [
        'topics/api-design',
        'topics/database-design',
        'topics/caching',
        'topics/load-balancing',
        'topics/cdn',
        'topics/blob-storage',
        'topics/networking',
        'topics/scaling-fundamentals',
      ],
    },
    {
      type: 'category',
      label: 'Medium — Intermediate',
      items: [
        'topics/consistent-hashing',
        'topics/database-sharding',
        'topics/database-replication',
        'topics/database-indexing',
        'topics/cap-theorem',
        'topics/message-queues',
        'topics/rate-limiting',
        'topics/realtime-updates',
        'topics/distributed-locking',
        'topics/redis',
        'topics/elasticsearch',
        'topics/cassandra',
        'topics/dynamodb',
        'topics/fanout-patterns',
        'topics/job-scheduling',
        'topics/microservices',
      ],
    },
    {
      type: 'category',
      label: 'Hard — Advanced',
      items: [
        'topics/stream-processing',
        'topics/distributed-counting',
        'topics/geo-search',
        'topics/realtime-collaboration',
        'topics/time-series-db',
        'topics/distributed-transactions',
        'topics/zookeeper',
        'topics/big-data-architecture',
        'topics/web-crawling',
        'topics/ad-aggregation',
        'topics/vector-databases',
      ],
    },
  ],

  problemsSidebar: [
    {
      type: 'category',
      label: 'Easy',
      items: [
        'problems/bitly',
        'problems/dropbox',
        'problems/yelp',
        'problems/local-delivery',
      ],
    },
    {
      type: 'category',
      label: 'Medium',
      items: [
        'problems/ticketmaster',
        'problems/instagram',
        'problems/fb-news-feed',
        'problems/tinder',
        'problems/leetcode',
        'problems/whatsapp',
        'problems/strava',
        'problems/distributed-cache',
        'problems/rate-limiter',
        'problems/online-auction',
        'problems/youtube',
        'problems/job-scheduler',
        'problems/fb-live-comments',
        'problems/news-aggregator',
        'problems/price-tracking',
      ],
    },
    {
      type: 'category',
      label: 'Hard',
      items: [
        'problems/top-k',
        'problems/uber',
        'problems/robinhood',
        'problems/google-docs',
        'problems/web-crawler',
        'problems/ad-click-aggregator',
        'problems/fb-post-search',
        'problems/payment-system',
        'problems/metrics-monitoring',
        'problems/online-chess',
        'problems/chatgpt',
      ],
    },
  ],
};

export default sidebars;
