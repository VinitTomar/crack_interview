import React from 'react';
import Layout from '@theme/Layout';
import Roadmap from '../components/Roadmap';

export default function Home() {
  return (
    <Layout
      title="System Design Roadmap"
      description="Interactive system design interview roadmap — 35 topics from beginner to advanced with curated problems and resources."
    >
      <main>
        <Roadmap />
      </main>
    </Layout>
  );
}
