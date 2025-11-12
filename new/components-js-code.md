// components.js - Bihar Elections 2025 Dashboard
// All React Components for the Dashboard
// Created: November 12, 2025

import React, { useState, useEffect, useMemo } from 'react';

const RESULTS_TARGET_ISO = '2025-11-14T10:00:00+05:30';
const ZERO_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

const DEFAULT_PREDICTIONS = [
  { party: 'NDA', seats: 160, color: '#FF6B35', label: 'National Democratic Alliance' },
  { party: 'MGB', seats: 70, color: '#22C55E', label: 'Mahagathbandhan' },
  { party: 'OTHERS', seats: 8, color: '#9B59B6', label: 'Others' }
];

const DEFAULT_STATS = [
  { label: 'Total Seats', value: '243', icon: '🗳️' },
  { label: 'Majority Needed', value: '122', icon: '🎯' },
  { label: 'AI Tokens Analyzed', value: '70M+', icon: '🤖' },
  { label: 'Prediction Confidence', value: '87%', icon: '📊' },
  { label: 'Total Voters', value: '3.7 Cr', icon: '👥' },
  { label: 'Total Candidates', value: '2,616', icon: '👤' }
];

const DEFAULT_NDA_ALLIANCE = [
  { party: 'BJP', seats_contested: 101 },
  { party: 'JD(U)', seats_contested: 101 },
  { party: 'LJP (RV)', seats_contested: 29 },
  { party: 'HAM(S)', seats_contested: 6 },
  { party: 'RLM', seats_contested: 6 }
];

const DEFAULT_MGB_ALLIANCE = [
  { party: 'RJD', seats_contested: 143 },
  { party: 'Congress', seats_contested: 61 },
  { party: 'CPI', seats_contested: 9 },
  { party: 'CPI(M)', seats_contested: 4 },
  { party: 'CPI(ML-L)', seats_contested: 20 },
  { party: 'VIP', seats_contested: 15 }
];

const DEFAULT_TICKER_FACTS = [
  'Phase 1 Voter Turnout: 65.08% - Historic High',
  'Phase 2 Voter Turnout: 67.14%',
  'Total Candidates: 2,616',
  'Polling Stations: 45,399',
  'Female Voters: 1.75 Crore',
  'Rural Polling Stations: 40,073',
  'Results Date: November 14, 2025',
  'AI Analysis: 70 Million+ Tokens'
];

const DEFAULT_ELECTION_DATA = {
  predictions: DEFAULT_PREDICTIONS,
  keyStats: DEFAULT_STATS,
  ndaAlliance: DEFAULT_NDA_ALLIANCE,
  mgbAlliance: DEFAULT_MGB_ALLIANCE,
  tickerFacts: DEFAULT_TICKER_FACTS,
  confidence: 87
};

const sanitizePredictions = (predictions) =>
  Array.isArray(predictions) && predictions.length ? predictions : DEFAULT_PREDICTIONS;

const getPartySeats = (predictions, party, fallback) => {
  const entry = predictions.find((item) => item.party === party);
  return entry && typeof entry.seats === 'number' ? entry.seats : fallback;
};

// =====================================================
// 1. COUNTDOWN TIMER COMPONENT
// =====================================================
export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(ZERO_TIME);

  useEffect(() => {
    const targetTime = new Date(RESULTS_TARGET_ISO).getTime();
    const updateTimer = () => {
      const difference = targetTime - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ ...ZERO_TIME });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <h2 className="countdown-label">Results Announcement In</h2>
      <div className="countdown-display">
        <div className="countdown-item">
          <span className="countdown-number">{timeLeft.days}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// 2. ANIMATED BAR CHART COMPONENT
// =====================================================
export const BarChart = ({ predictions }) => {
  const sanitized = useMemo(() => sanitizePredictions(predictions), [predictions]);
  const targetSeats = useMemo(
    () => ({
      nda: getPartySeats(sanitized, 'NDA', 160),
      mgb: getPartySeats(sanitized, 'MGB', 70),
      others: getPartySeats(sanitized, 'OTHERS', 8)
    }),
    [sanitized]
  );

  const [animatedValues, setAnimatedValues] = useState({ nda: 0, mgb: 0, others: 0 });

  useEffect(() => {
    let interval;
    let current = { nda: 0, mgb: 0, others: 0 };
    const increments = {
      nda: Math.max(1, Math.ceil(targetSeats.nda / 60)),
      mgb: Math.max(1, Math.ceil(targetSeats.mgb / 60)),
      others: Math.max(1, Math.ceil(targetSeats.others / 60))
    };

    interval = setInterval(() => {
      current = {
        nda: Math.min(current.nda + increments.nda, targetSeats.nda),
        mgb: Math.min(current.mgb + increments.mgb, targetSeats.mgb),
        others: Math.min(current.others + increments.others, targetSeats.others)
      };

      setAnimatedValues({ ...current });

      if (
        current.nda === targetSeats.nda &&
        current.mgb === targetSeats.mgb &&
        current.others === targetSeats.others
      ) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [targetSeats]);

  const maxSeats = Math.max(targetSeats.nda, targetSeats.mgb, targetSeats.others, 243);
  const getHeight = (value) => (value / maxSeats) * 100;

  return (
    <div className="bar-chart-container">
      <h3 className="chart-title">Seat Predictions</h3>
      <div className="bars-wrapper">
        <div className="bar-item">
          <div className="bar-label">NDA</div>
          <div className="bar-background">
            <div
              className="bar-fill nda-bar"
              style={{
                height: `${getHeight(animatedValues.nda)}%`,
                transition: 'height 0.3s ease-out'
              }}
            >
              <span className="bar-value">{Math.round(animatedValues.nda)}+</span>
            </div>
          </div>
        </div>
        <div className="bar-item">
          <div className="bar-label">MGB</div>
          <div className="bar-background">
            <div
              className="bar-fill mgb-bar"
              style={{
                height: `${getHeight(animatedValues.mgb)}%`,
                transition: 'height 0.3s ease-out'
              }}
            >
              <span className="bar-value">{Math.round(animatedValues.mgb)}+</span>
            </div>
          </div>
        </div>
        <div className="bar-item">
          <div className="bar-label">Others</div>
          <div className="bar-background">
            <div
              className="bar-fill others-bar"
              style={{
                height: `${getHeight(animatedValues.others)}%`,
                transition: 'height 0.3s ease-out'
              }}
            >
              <span className="bar-value">{Math.round(animatedValues.others)}+</span>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-footer">Total Seats: 243 | Majority: 122</div>
    </div>
  );
};

// =====================================================
// 3. PIE CHART COMPONENT
// =====================================================
export const PieChart = ({ predictions }) => {
  const sanitized = useMemo(() => sanitizePredictions(predictions), [predictions]);
  const totalSeats = sanitized.reduce((total, entry) => total + entry.seats, 0) || 1;

  const segments = useMemo(() => {
    let offsetSoFar = 0;
    return sanitized.map((segment) => {
      const percentage = (segment.seats / totalSeats) * 100;
      const dashArray = `${percentage * 2.51} 251`;
      const dashOffset = -offsetSoFar;
      offsetSoFar += (segment.seats / totalSeats) * 2.51;
      return {
        ...segment,
        percentage,
        dashArray,
        dashOffset
      };
    });
  }, [sanitized, totalSeats]);

  return (
    <div className="pie-chart-container">
      <h3 className="chart-title">Seat Distribution (%)</h3>
      <div className="pie-wrapper">
        <svg className="pie-svg" viewBox="0 0 100 100">
          {segments.map((segment, index) => (
            <circle
              key={segment.party}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={segment.color}
              strokeWidth="25"
              strokeDasharray={segment.dashArray}
              strokeDashoffset={`${segment.dashOffset}`}
              transform="rotate(-90 50 50)"
              className="pie-segment"
            />
          ))}
        </svg>
        <div className="pie-center-text">
          <div className="pie-center-label">Total</div>
          <div className="pie-center-value">{totalSeats}</div>
        </div>
      </div>
      <div className="pie-legend">
        {segments.map((segment) => (
          <div key={`${segment.party}-legend`} className={`legend-item ${segment.party.toLowerCase()}`}>
            <span className="legend-color" style={{ background: segment.color }}></span>
            <span className="legend-label">
              {segment.label}: {segment.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// =====================================================
// 4. STATS CARDS COMPONENT
// =====================================================
export const StatsCards = ({ stats }) => {
  const safeStats = Array.isArray(stats) && stats.length ? stats : DEFAULT_STATS;

  return (
    <div className="stats-container">
      <h3 className="stats-title">Key Election Metrics</h3>
      <div className="stats-grid">
        {safeStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =====================================================
// 5. LIVE TICKER COMPONENT
// =====================================================
export const LiveTicker = ({ facts }) => {
  const safeFacts = Array.isArray(facts) && facts.length ? facts : DEFAULT_TICKER_FACTS;
  const marqueeFacts = [...safeFacts, ...safeFacts];
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const scrollWidth = safeFacts.length * 300;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % scrollWidth);
    }, 30);
    return () => clearInterval(interval);
  }, [safeFacts.length]);

  return (
    <div className="ticker-container">
      <div className="ticker-header">
        <span className="ticker-icon">📰</span>
        <span className="ticker-title">Live Facts & Updates</span>
      </div>
      <div className="ticker-wrapper">
        <div className="ticker-content" style={{ transform: `translateX(-${offset}px)` }}>
          {marqueeFacts.map((fact, index) => (
            <span key={index} className="ticker-item">
              {fact}
              <span className="ticker-separator">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// =====================================================
// 6. CONFIDENCE METER COMPONENT
// =====================================================
export const ConfidenceMeter = ({ confidence = DEFAULT_ELECTION_DATA.confidence }) => {
  return (
    <div className="confidence-container">
      <h3 className="confidence-title">Prediction Confidence</h3>
      <div className="confidence-meter">
        <svg className="confidence-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#00f2ff"
            strokeWidth="8"
            strokeDasharray={`${(confidence / 100) * 283} 283`}
            strokeDashoffset="0"
            transform="rotate(-90 50 50)"
            className="confidence-progress"
          />
        </svg>
        <div className="confidence-text">
          <span className="confidence-value">{confidence}%</span>
          <span className="confidence-label">Confidence Score</span>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// 7. ALLIANCE BREAKDOWN COMPONENT
// =====================================================
export const AllianceBreakdown = ({ ndaAllies, mgbAllies }) => {
  const safeNdaAllies = Array.isArray(ndaAllies) && ndaAllies.length ? ndaAllies : DEFAULT_NDA_ALLIANCE;
  const safeMgbAllies = Array.isArray(mgbAllies) && mgbAllies.length ? mgbAllies : DEFAULT_MGB_ALLIANCE;

  return (
    <div className="alliance-container">
      <h3 className="alliance-title">Coalition Partners</h3>
      <div className="alliance-wrapper">
        <div className="alliance-block nda-alliance">
          <div className="alliance-header nda-header">
            <span className="alliance-name">NDA Alliance</span>
            <span className="alliance-badge">160+ Seats</span>
          </div>
          <div className="alliance-partners">
            {safeNdaAllies.map((party, index) => (
              <div key={`nda-${index}`} className="partner-card">
                <span className="partner-name">{party.party}</span>
                <span className="partner-seats">{party.seats_contested ?? 'N/A'} seats</span>
              </div>
            ))}
          </div>
        </div>
        <div className="alliance-block mgb-alliance">
          <div className="alliance-header mgb-header">
            <span className="alliance-name">MGB Alliance</span>
            <span className="alliance-badge">70+ Seats</span>
          </div>
          <div className="alliance-partners">
            {safeMgbAllies.map((party, index) => (
              <div key={`mgb-${index}`} className="partner-card">
                <span className="partner-name">{party.party}</span>
                <span className="partner-seats">{party.seats_contested ?? 'N/A'} seats</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// 8. VISUALIZATION ROTATOR COMPONENT
// =====================================================
export const VisualizationRotator = ({ predictions, stats, confidence }) => {
  const views = ['bar', 'pie', 'gauge', 'stats'];
  const [currentView, setCurrentView] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % views.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [views.length]);

  const activePredictions = sanitizePredictions(predictions);
  const activeStats = Array.isArray(stats) && stats.length ? stats : DEFAULT_STATS;
  const activeConfidence = typeof confidence === 'number' ? confidence : DEFAULT_ELECTION_DATA.confidence;

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h3 className="visualizer-title">Interactive Visualizations</h3>
        <div className="visualizer-dots">
          {views.map((view, index) => (
            <span
              key={view}
              className={`dot ${currentView === index ? 'active' : ''}`}
              onClick={() => setCurrentView(index)}
            />
          ))}
        </div>
      </div>
      <div className="visualizer-content">
        {currentView === 0 && <BarChart predictions={activePredictions} />}
        {currentView === 1 && <PieChart predictions={activePredictions} />}
        {currentView === 2 && <ConfidenceMeter confidence={activeConfidence} />}
        {currentView === 3 && <StatsCards stats={activeStats} />}
      </div>
    </div>
  );
};

// =====================================================
// 9. HEADER COMPONENT
// =====================================================
export const Header = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="header-title">Bihar Elections 2025</h1>
        <p className="header-subtitle">Pre-Poll Predictions by NNN AI Labs</p>
        <p className="header-description">Trained on 70 Million+ AI Tokens | Data-Driven Political Analytics</p>
      </div>
      <div className="header-badge">
        <span className="badge-text">🚀 LIVE</span>
      </div>
    </header>
  );
};

// =====================================================
// 10. FOOTER COMPONENT
// =====================================================
export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <p className="footer-text">
            Powered by <strong>NNN AI Labs</strong> & <strong>Sudarshan AI Labs</strong>
          </p>
          <p className="footer-description">Data-driven Political Analytics | AI-Generated Predictions</p>
        </div>
        <div className="footer-section">
          <div className="hashtags">
            <span className="hashtag">#BiharElections2025</span>
            <span className="hashtag">#AIInsight</span>
            <span className="hashtag">#DataPolitics</span>
          </div>
        </div>
        <div className="footer-section">
          <p className="disclaimer">
            ⚠️ <strong>Disclaimer:</strong> These are AI-generated predictions based on data analysis and do not
            represent official election results. Actual results will be announced on November 14, 2025.
          </p>
        </div>
      </div>
    </footer>
  );
};

// =====================================================
// 11. MAIN DASHBOARD COMPONENT
// =====================================================
export const Dashboard = ({ electionData }) => {
  const safePredictions = sanitizePredictions(electionData?.predictions);
  const safeStats = Array.isArray(electionData?.keyStats) && electionData.keyStats.length ? electionData.keyStats : DEFAULT_STATS;
  const safeNdaAllies =
    Array.isArray(electionData?.ndaAlliance) && electionData.ndaAlliance.length ? electionData.ndaAlliance : DEFAULT_NDA_ALLIANCE;
  const safeMgbAllies =
    Array.isArray(electionData?.mgbAlliance) && electionData.mgbAlliance.length ? electionData.mgbAlliance : DEFAULT_MGB_ALLIANCE;
  const safeFacts =
    Array.isArray(electionData?.tickerFacts) && electionData.tickerFacts.length ? electionData.tickerFacts : DEFAULT_TICKER_FACTS;
  const safeConfidence =
    typeof electionData?.confidence === 'number' ? electionData.confidence : DEFAULT_ELECTION_DATA.confidence;

  return (
    <div className="dashboard-wrapper">
      <Header />
      <main className="dashboard-main">
        <section className="section countdown-section">
          <CountdownTimer />
        </section>
        <section className="section chart-section">
          <BarChart predictions={safePredictions} />
        </section>
        <section className="section stats-section">
          <StatsCards stats={safeStats} />
        </section>
        <section className="section confidence-section">
          <ConfidenceMeter confidence={safeConfidence} />
        </section>
        <section className="section visualizer-section">
          <VisualizationRotator predictions={safePredictions} stats={safeStats} confidence={safeConfidence} />
        </section>
        <section className="section alliance-section">
          <AllianceBreakdown ndaAllies={safeNdaAllies} mgbAllies={safeMgbAllies} />
        </section>
        <section className="section ticker-section">
          <LiveTicker facts={safeFacts} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
