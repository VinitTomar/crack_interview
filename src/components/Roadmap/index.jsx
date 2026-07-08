import React, { useState, useEffect, useMemo } from 'react';
import { LEVELS, TOTAL_TOPICS, DIFFICULTY_COUNT } from '../../data/roadmap';
import TopicCard from './TopicCard';
import styles from './styles.module.css';

const STORAGE_KEY = 'sd-roadmap-progress';

function loadProgress() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

const FILTERS = ['All', 'Easy', 'Medium', 'Hard'];

export default function Roadmap() {
  const [progress, setProgress] = useState({});
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [hydrated, setHydrated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  useEffect(() => {
    function onScroll() { setIsScrolled(window.scrollY > 80); }
    onScroll(); // set correct initial state without waiting for first scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toggleTopic(topicId) {
    setProgress(prev => {
      const next = { ...prev, [topicId]: !prev[topicId] };
      saveProgress(next);
      return next;
    });
  }

  const doneCount = useMemo(() => Object.values(progress).filter(Boolean).length, [progress]);
  const pct = TOTAL_TOPICS > 0 ? Math.round((doneCount / TOTAL_TOPICS) * 100) : 0;

  const doneByDifficulty = useMemo(() => {
    const counts = { Easy: 0, Medium: 0, Hard: 0 };
    LEVELS.forEach(level => {
      level.topics.forEach(t => {
        if (progress[t.id]) counts[level.difficulty]++;
      });
    });
    return counts;
  }, [progress]);

  const filteredLevels = useMemo(() => {
    const q = search.toLowerCase().trim();
    return LEVELS
      .filter(level => activeFilter === 'All' || level.difficulty === activeFilter)
      .map(level => ({
        ...level,
        topics: level.topics.filter(t =>
          !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
        ),
      }))
      .filter(level => level.topics.length > 0);
  }, [search, activeFilter]);

  const totalVisible = filteredLevels.reduce((s, l) => s + l.topics.length, 0);

  return (
    <div className={styles.roadmapPage}>
      <div className={styles.hero}>
        <h1>System Design Roadmap</h1>
        <p>35 topics · 30 interview problems · Beginner to Advanced</p>
      </div>

      <div className={`${styles.controls} ${isScrolled ? styles.controlsCompact : ''}`}>
        {/* Progress bar */}
        <div className={styles.progressSection}>
          <div className={`${styles.progressHeader} ${isScrolled ? styles.progressHidden : ''}`}>
            <span>Progress</span>
            <span>{hydrated ? doneCount : 0} / {TOTAL_TOPICS} completed ({hydrated ? pct : 0}%)</span>
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
                {hydrated ? doneCount : 0}/{TOTAL_TOPICS}
              </span>
            )}
          </div>
          {hydrated && (
            <div className={`${styles.progressBreakdown} ${isScrolled ? styles.progressHidden : ''}`}>
              <span>Easy {doneByDifficulty.Easy}/{DIFFICULTY_COUNT.Easy}</span>
              <span>·</span>
              <span>Medium {doneByDifficulty.Medium}/{DIFFICULTY_COUNT.Medium}</span>
              <span>·</span>
              <span>Hard {doneByDifficulty.Hard}/{DIFFICULTY_COUNT.Hard}</span>
            </div>
          )}
        </div>

        {/* Search + filter */}
        <div className={styles.searchFilterRow}>
          <input
            type="text"
            placeholder="Search topics…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.filterTabs}>
            {FILTERS.map(f => (
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

      {/* Topic levels */}
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
