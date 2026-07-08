import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const DIFF_CLASS = {
  Easy: styles.diffEasy,
  Medium: styles.diffMedium,
  Hard: styles.diffHard,
  Foundational: styles.diffFoundational,
  Intermediate: styles.diffIntermediate,
  Advanced: styles.diffAdvanced,
};

export default function TopicCard({ topic, difficulty, levelColor, checked, onToggle }) {
  const [expanded, setExpanded] = useState(false);

  function handleCheckboxChange(e) {
    e.stopPropagation();
    onToggle(topic.id);
  }

  function handleHeaderClick() {
    setExpanded(prev => !prev);
  }

  return (
    <div className={styles.topicItem}>
      {/* Timeline node */}
      <div
        className={`${styles.topicNode} ${checked ? styles.topicNodeDone : ''}`}
        style={{ borderColor: levelColor, color: levelColor }}
      />

      <div className={`${styles.topicCard} ${checked ? styles.topicCardDone : ''}`}>
        {/* Header row — always visible */}
        <div className={styles.topicHeader} onClick={handleHeaderClick}>
          <input
            type="checkbox"
            className={styles.topicCheckbox}
            checked={checked}
            onChange={handleCheckboxChange}
            onClick={e => e.stopPropagation()}
          />
          <span className={styles.topicNumber}>#{topic.number}</span>
          <span className={`${styles.topicTitle} ${checked ? styles.topicTitleDone : ''}`}>
            {topic.title}
          </span>
          <span className={`${styles.diffBadge} ${DIFF_CLASS[difficulty]}`}>{difficulty}</span>
          <span className={`${styles.expandIcon} ${expanded ? styles.expandIconOpen : ''}`}>▼</span>
        </div>

        {/* Expanded body */}
        <div className={`${styles.topicBody} ${expanded ? styles.topicBodyOpen : ''}`}>
          <div className={styles.topicBodyInner}>
            <p className={styles.sectionLabel}>What to learn</p>
            <p className={styles.topicDescription}>{topic.description}</p>

            <p className={styles.sectionLabel}>Resources</p>
            <ul className={styles.resourceList}>
              {topic.resources.map(r => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resourceLink}
                  >
                    ↗ {r.label}
                  </a>
                </li>
              ))}
            </ul>

            {topic.coveredBy && topic.coveredBy.length > 0 && (
              <>
                <p className={styles.sectionLabel}>Covered by problems</p>
                <div className={styles.problemList}>
                  {topic.coveredBy.map(p => {
                    const badge = (
                      <span className={`${styles.diffBadge} ${DIFF_CLASS[p.difficulty] || styles.diffDefault}`}>
                        {p.difficulty}
                      </span>
                    );
                    return p.url.startsWith('/') ? (
                      <Link key={p.url} to={p.url} className={styles.problemChip}>
                        {badge}{p.name}
                      </Link>
                    ) : (
                      <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.problemChip}>
                        {badge}{p.name}
                      </a>
                    );
                  })}
                </div>
              </>
            )}

            <Link to={topic.docsPath} className={styles.docsLink}>
              📄 Read full notes →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
