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

  lldTopicsSidebar: [
    {
      type: 'category',
      label: 'Fundamentals',
      items: [
        'lld/topics/oop-fundamentals',
        'lld/topics/solid-principles',
        'lld/topics/object-relationships',
        'lld/topics/interfaces-vs-abstract',
        'lld/topics/design-principles',
        'lld/topics/uml-diagrams',
      ],
    },
    {
      type: 'category',
      label: 'Patterns',
      items: [
        'lld/topics/creational-patterns',
        'lld/topics/structural-adapter-decorator',
        'lld/topics/structural-facade-proxy',
        'lld/topics/structural-composite-bridge',
        'lld/topics/behavioral-observer-strategy',
        'lld/topics/behavioral-command-template',
        'lld/topics/behavioral-iterator-state',
        'lld/topics/behavioral-chain-mediator',
        'lld/topics/dependency-injection',
        'lld/topics/concurrency-patterns',
      ],
    },
  ],

  lldProblemsSidebar: [
    {
      type: 'category',
      label: 'Machine Coding Problems',
      items: [
        'lld/problems/parking-lot',
        'lld/problems/lru-cache',
        'lld/problems/elevator-system',
        'lld/problems/library-management',
        'lld/problems/hotel-booking',
        'lld/problems/vending-machine',
        'lld/problems/ride-sharing',
        'lld/problems/rate-limiter-lld',
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
