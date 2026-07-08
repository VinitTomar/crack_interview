import React from 'react';
import Layout from '@theme/Layout';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <Layout
      title="Crack Interview"
      description="HLD and LLD roadmaps for software engineering interviews — system design, OOP, and design patterns."
    >
      <main>
        <Dashboard />
      </main>
    </Layout>
  );
}
