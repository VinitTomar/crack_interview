import React from 'react';
import Layout from '@theme/Layout';
import Roadmap from '../components/Roadmap';
import { LLD_LEVELS, LLD_TOTAL_TOPICS } from '../data/lld-roadmap';

export default function LLD() {
  return (
    <Layout
      title="LLD Roadmap"
      description="Low Level Design roadmap — OOP, design patterns, and machine-coding problems."
    >
      <main>
        <Roadmap
          levels={LLD_LEVELS}
          totalTopics={LLD_TOTAL_TOPICS}
          storageKey="lld-roadmap-progress"
          title="Low Level Design Roadmap"
          subtitle="16 topics · Foundational · Intermediate · Advanced"
        />
      </main>
    </Layout>
  );
}
