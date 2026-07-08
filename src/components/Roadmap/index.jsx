import React, { useState, useEffect, useMemo } from 'react';
import TopicCard from './TopicCard';
import styles from './styles.module.css';

function loadProgress(key) {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(key, progress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(progress));
}

export default function Roadmap({ levels, totalTopics, storageKey, title, subtitle }) {
  const [progress, setProgress] = useState({});
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [hydrated, setHydrated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setProgress(loadProgress(storageKey));
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    function onScroll() { setIsScrolled(window.scrollY > 80); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toggleTopic(topicId) {
    setProgress(prev => {
      const next = { ...prev, [topicId]: !prev[topicId] };
      saveProgress(storageKey, next);
      return next;
    });
  }

  const filters = useMemo(() => ['All', ...levels.map(l => l.difficulty)], [levels]);

  const doneCount = useMemo(() => Object.values(progress).filter(Boolean).length, [progress]);
  const pct = totalTopics > 0 ? Math.round((doneCount / totalTopics) * 100) : 0;

  const doneByDifficulty = useMemo(() => {
    const counts = {};
    levels.forEach(l => { counts[l.difficulty] = 0; });
    levels.forEach(l => l.topics.forEach(t => {
      if (progress[t.id]) counts[l.difficulty]++;
    }));
    return counts;
  }, [progress, levels]);

  const filteredLevels = useMemo(() => {
    const q = search.toLowerCase().trim();
    return levels
      .filter(level => activeFilter === 'All' || level.difficulty === activeFilter)
      .map(level => ({
        ...level,
        topics: level.topics.filter(t =>
          !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
        ),
      }))
      .filter(level => level.topics.length > 0);
  }, [search, activeFilter, levels]);

  const totalVisible = filteredLevels.reduce((s, l) => s + l.topics.length, 0);

  return (
    <div className={styles.roadmapPage}>
      <div className={styles.hero}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className={`${styles.controls} ${isScrolled ? styles.controlsCompact : ''}`}>
        <div className={styles.progressSection}>
          <div className={`${styles.progressHeader} ${isScrolled ? styles.progressHidden : ''}`}>
            <span>Progress</span>
            <span>{hydrated ? doneCount : 0} / {totalTopics} completed ({hydrated ? pct : 0}%)</span>
          </div>
          <div className={styles.progressBarRow}>
            <div className={styles.progressBarTrack}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${hydrated ? pct : 0}%` }}
              />
            </div>
            {isScrolled && (
              <span className={styles.progressCompactLabel}>
                {hydrated ? doneCount : 0}/{totalTopics}
              </span>
            )}
          </div>
          {hydrated && (
            <div className={`${styles.progressBreakdown} ${isScrolled ? styles.progressHidden : ''}`}>
              {levels.map((l, i) => (
                <React.Fragment key={l.id}>
                  {i > 0 && <span>·</span>}
                  <span>{l.difficulty} {doneByDifficulty[l.difficulty]}/{l.topics.length}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <div className={styles.searchFilterRow}>
          <input
            type="text"
            placeholder="Search topics…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.filterTabs}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`${styles.filterTab} ${activeFilter === f ? styles.filterTabActive : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {totalVisible === 0 ? (
        <div className={styles.emptyState}>No topics match your search.</div>
      ) : (
        filteredLevels.map(level => (
          <div key={level.id} className={styles.levelSection}>
            <div className={styles.levelHeader}>
              <div className={styles.levelDot} style={{ background: level.color }} />
              <span className={styles.levelTitle}>{level.label}</span>
              <span className={styles.levelCount}>{level.topics.length} topics</span>
            </div>

            <div className={styles.timeline}>
              {level.topics.map(topic => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  difficulty={level.difficulty}
                  levelColor={level.color}
                  checked={hydrated ? !!progress[topic.id] : false}
                  onToggle={toggleTopic}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
