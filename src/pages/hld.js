import React from 'react';
import Layout from '@theme/Layout';
import Roadmap from '../components/Roadmap';
import { LEVELS, TOTAL_TOPICS } from '../data/roadmap';

export default function HLD() {
  return (
    <Layout
      title="HLD Roadmap"
      description="High Level Design roadmap — 35 topics from API design to distributed systems."
    >
      <main>
        <Roadmap
          levels={LEVELS}
          totalTopics={TOTAL_TOPICS}
          storageKey="sd-roadmap-progress"
          title="High Level Design Roadmap"
          subtitle="35 topics · 30 interview problems · Foundational to Advanced"
        />
      </main>
    </Layout>
  );
}
