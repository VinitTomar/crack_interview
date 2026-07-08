import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { LEVELS, TOTAL_TOPICS } from '../../data/roadmap';
import { LLD_LEVELS, LLD_TOTAL_TOPICS } from '../../data/lld-roadmap';
import styles from './styles.module.css';

function loadProgress(key) {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(key) || '{}'); }
  catch { return {}; }
}

function TrackCard({ title, subtitle, levels, totalTopics, storageKey, href, accentColor }) {
  const [progress, setProgress] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadProgress(storageKey));
    setHydrated(true);

    function onStorage(e) {
      if (e.key === storageKey) setProgress(loadProgress(storageKey));
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [storageKey]);

  const doneCount = hydrated ? Object.values(progress).filter(Boolean).length : 0;
  const pct = totalTopics > 0 ? Math.round((doneCount / totalTopics) * 100) : 0;

  const doneByLevel = levels.reduce((acc, l) => {
    acc[l.id] = l.topics.filter(t => hydrated && progress[t.id]).length;
    return acc;
  }, {});

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle} style={{ color: accentColor }}>{title}</h2>
        <p className={styles.cardSubtitle}>{subtitle}</p>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressLabel}>
          <span>Progress</span>
          <span className={styles.progressCount}>{doneCount} / {totalTopics} ({pct}%)</span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${pct}%`, background: accentColor }}
          />
        </div>
      </div>

      <div className={styles.levelBreakdown}>
        {levels.map((l, i) => (
          <React.Fragment key={l.id}>
            {i > 0 && <span className={styles.sep}>·</span>}
            <span className={styles.levelStat}>
              <span className={styles.levelDot} style={{ background: l.color }} />
              {l.difficulty} {doneByLevel[l.id]}/{l.topics.length}
            </span>
          </React.Fragment>
        ))}
      </div>

      <Link to={href} className={styles.cardCta} style={{ background: accentColor }}>
        Open Roadmap →
      </Link>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Crack Interview</h1>
        <p className={styles.heroSubtitle}>
          Two roadmaps to nail your software engineering interviews — System Design (HLD) and Object Oriented Design (LLD).
        </p>
      </div>

      <div className={styles.cards}>
        <TrackCard
          title="High Level Design"
          subtitle="35 topics · 30 problems · Distributed systems & architecture"
          levels={LEVELS}
          totalTopics={TOTAL_TOPICS}
          storageKey="sd-roadmap-progress"
          href="/hld"
          accentColor="#16a34a"
        />
        <TrackCard
          title="Low Level Design"
          subtitle="24 topics · OOP fundamentals · Design patterns · Machine-coding"
          levels={LLD_LEVELS}
          totalTopics={LLD_TOTAL_TOPICS}
          storageKey="lld-roadmap-progress"
          href="/lld"
          accentColor="#7c3aed"
        />
      </div>
    </div>
  );
}
