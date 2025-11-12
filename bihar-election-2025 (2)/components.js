const { useState, useEffect, useRef } = React;

const App = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [barHeights, setBarHeights] = useState({ nda: 0, mgb: 0, others: 0 });
  const [barCounts, setBarCounts] = useState({ nda: 0, mgb: 0, others: 0 });
  const [currentVizIndex, setCurrentVizIndex] = useState(0);
  const [confidenceProgress, setConfidenceProgress] = useState(0);
  
  const pieChartRef = useRef(null);
  const horizontalChartRef = useRef(null);
  const gaugeChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  
  const pieChartInstance = useRef(null);
  const horizontalChartInstance = useRef(null);
  const gaugeChartInstance = useRef(null);
  const doughnutChartInstance = useRef(null);

  const targetDate = new Date('2025-11-14T10:00:00+05:30');
  
  const predictions = [
    { party: 'NDA', seats: 160, color: '#FF6B35', label: 'National Democratic Alliance' },
    { party: 'MGB', seats: 70, color: '#4ECDC4', label: 'Mahagathbandhan' },
    { party: 'OTHERS', seats: 8, color: '#9B59B6', label: 'Others' }
  ];

  const stats = [
    { label: 'Total Seats', value: '243', icon: '🗳️' },
    { label: 'Majority Needed', value: '122', icon: '🎯' },
    { label: 'AI Tokens Analyzed', value: '70M+', icon: '🤖' },
    { label: 'Prediction Confidence', value: '87%', icon: '📊' },
    { label: 'Total Voters', value: '3.7 Cr', icon: '👥' },
    { label: 'Total Candidates', value: '2616', icon: '👤' }
  ];

  const ndaAlliance = [
    { party: 'BJP', seats_contested: 101 },
    { party: 'JD(U)', seats_contested: 101 },
    { party: 'LJP (RV)', seats_contested: 29 },
    { party: 'HAM(S)', seats_contested: 6 },
    { party: 'RLM', seats_contested: 6 }
  ];

  const mgbAlliance = [
    { party: 'RJD', seats_contested: 143 },
    { party: 'Congress', seats_contested: 61 },
    { party: 'CPI', seats_contested: 9 },
    { party: 'CPI(M)', seats_contested: 4 },
    { party: 'CPI(ML-L)', seats_contested: 20 },
    { party: 'VIP', seats_contested: 15 }
  ];

  const tickerFacts = [
    'Phase 1 Voter Turnout: 65.08% - Historic High',
    'Phase 2 Voter Turnout: 67.14%',
    'Total Candidates: 2,616',
    'Polling Stations: 45,399',
    'Female Voters: 1.75 Crore',
    'Rural Polling Stations: 40,073',
    'Results Date: November 14, 2025',
    'AI Analysis: 70 Million+ Tokens'
  ];

  // Countdown Timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animate Bars
  useEffect(() => {
    const animateBars = () => {
      let progress = 0;
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      const interval = setInterval(() => {
        progress++;
        const percentage = progress / steps;
        const easeOut = 1 - Math.pow(1 - percentage, 3);

        setBarHeights({
          nda: easeOut * 100,
          mgb: easeOut * 43.75,
          others: easeOut * 5
        });

        setBarCounts({
          nda: Math.floor(easeOut * 160),
          mgb: Math.floor(easeOut * 70),
          others: Math.floor(easeOut * 8)
        });

        if (progress >= steps) {
          clearInterval(interval);
          setBarHeights({ nda: 100, mgb: 43.75, others: 5 });
          setBarCounts({ nda: 160, mgb: 70, others: 8 });
        }
      }, stepDuration);
    };

    setTimeout(animateBars, 500);
  }, []);

  // Animate Confidence Progress
  useEffect(() => {
    let progress = 0;
    const targetProgress = 87;
    const interval = setInterval(() => {
      progress += 1;
      setConfidenceProgress(progress);
      if (progress >= targetProgress) {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Rotating Visualizations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVizIndex((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Create Pie Chart
  useEffect(() => {
    if (pieChartRef.current && currentVizIndex === 0) {
      const ctx = pieChartRef.current.getContext('2d');
      
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      pieChartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['NDA (160)', 'MGB (70)', 'Others (8)'],
          datasets: [{
            data: [160, 70, 8],
            backgroundColor: ['#FF6B35', '#4ECDC4', '#9B59B6'],
            borderColor: '#1a1d3a',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#ffffff',
                font: { size: 14, family: 'Orbitron' },
                padding: 15
              }
            },
            title: {
              display: true,
              text: 'Seat Distribution',
              color: '#00f2ff',
              font: { size: 20, family: 'Orbitron', weight: 'bold' }
            }
          }
        }
      });
    }
  }, [currentVizIndex]);

  // Create Horizontal Bar Chart
  useEffect(() => {
    if (horizontalChartRef.current && currentVizIndex === 1) {
      const ctx = horizontalChartRef.current.getContext('2d');
      
      if (horizontalChartInstance.current) {
        horizontalChartInstance.current.destroy();
      }

      horizontalChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['NDA', 'MGB', 'Others'],
          datasets: [{
            label: 'Predicted Seats',
            data: [160, 70, 8],
            backgroundColor: ['#FF6B35', '#4ECDC4', '#9B59B6'],
            borderColor: ['#FF6B35', '#4ECDC4', '#9B59B6'],
            borderWidth: 2
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Comparative Analysis',
              color: '#00f2ff',
              font: { size: 20, family: 'Orbitron', weight: 'bold' }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: '#b8c1ec', font: { family: 'Inter' } }
            },
            y: {
              grid: { display: false },
              ticks: { color: '#ffffff', font: { size: 16, family: 'Orbitron', weight: 'bold' } }
            }
          }
        }
      });
    }
  }, [currentVizIndex]);

  // Create Gauge Chart
  useEffect(() => {
    if (gaugeChartRef.current && currentVizIndex === 2) {
      const ctx = gaugeChartRef.current.getContext('2d');
      
      if (gaugeChartInstance.current) {
        gaugeChartInstance.current.destroy();
      }

      gaugeChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['NDA Lead', 'Others'],
          datasets: [{
            data: [160, 83],
            backgroundColor: ['#FF6B35', 'rgba(255, 255, 255, 0.1)'],
            borderColor: '#1a1d3a',
            borderWidth: 2,
            circumference: 180,
            rotation: 270
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'NDA Dominance Meter',
              color: '#00f2ff',
              font: { size: 20, family: 'Orbitron', weight: 'bold' }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.label + ': ' + context.parsed + ' seats';
                }
              }
            }
          }
        }
      });
    }
  }, [currentVizIndex]);

  // Create Doughnut Chart
  useEffect(() => {
    if (doughnutChartRef.current && currentVizIndex === 3) {
      const ctx = doughnutChartRef.current.getContext('2d');
      
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }

      doughnutChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['NDA', 'MGB', 'Others'],
          datasets: [{
            data: [160, 70, 8],
            backgroundColor: ['#FF6B35', '#4ECDC4', '#9B59B6'],
            borderColor: '#1a1d3a',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#ffffff',
                font: { size: 14, family: 'Orbitron' },
                padding: 15
              }
            },
            title: {
              display: true,
              text: 'Power Distribution Ring',
              color: '#00f2ff',
              font: { size: 20, family: 'Orbitron', weight: 'bold' }
            }
          }
        }
      });
    }
  }, [currentVizIndex]);

  // Particles
  const Particles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      );
    }
    return <div className="particles">{particles}</div>;
  };

  return (
    <div className="dashboard">
      <div className="background-grid" />
      <Particles />

      {/* Hero Section */}
      <section className="hero fade-in stagger-1">
        <h1 className="hero-title">Bihar Elections 2025</h1>
        <p className="hero-subtitle">Pre-Poll AI Predictions</p>
        <p className="hero-org">Powered by NNN AI Labs</p>
        <p className="hero-subtitle" style={{ marginTop: '10px' }}>Trained on 70 Million+ AI Tokens</p>
      </section>

      {/* Countdown Timer */}
      <section className="countdown-section fade-in stagger-2">
        <h2 className="countdown-label">Results Announcement In</h2>
        <div className="countdown-timer">
          <div className="countdown-item">
            <div className="countdown-value">{String(countdown.days).padStart(2, '0')}</div>
            <div className="countdown-unit">Days</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-value">{String(countdown.hours).padStart(2, '0')}</div>
            <div className="countdown-unit">Hours</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</div>
            <div className="countdown-unit">Minutes</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</div>
            <div className="countdown-unit">Seconds</div>
          </div>
        </div>
      </section>

      {/* Main Bar Chart */}
      <section className="chart-section fade-in stagger-3">
        <h2 className="section-title">Seat Predictions</h2>
        <div className="bar-chart-container">
          {predictions.map((prediction, index) => (
            <div key={prediction.party} className="bar-item">
              <div className="bar-wrapper">
                <div
                  className={`bar ${prediction.party.toLowerCase()}`}
                  style={{
                    height: `${barHeights[prediction.party.toLowerCase()]}%`,
                    backgroundColor: prediction.color
                  }}
                >
                  <div className="bar-value">{barCounts[prediction.party.toLowerCase()]}+</div>
                </div>
              </div>
              <div className="bar-label">
                {prediction.party}
                <div className="bar-sublabel">{prediction.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Grid */}
      <section className="stats-grid fade-in stagger-4">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Confidence Meter */}
      <section className="confidence-meter fade-in stagger-5">
        <h2 className="section-title" style={{ marginBottom: '30px' }}>Prediction Confidence</h2>
        <div className="meter-container">
          <svg className="circular-progress" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="15"
            />
            <circle
              className="progress-ring-circle"
              cx="100"
              cy="100"
              r="80"
              fill="none"
              strokeWidth="15"
              strokeDasharray={`${2 * Math.PI * 80}`}
              strokeDashoffset={`${2 * Math.PI * 80 * (1 - confidenceProgress / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="meter-value">{confidenceProgress}%</div>
        </div>
        <div className="meter-label">AI Prediction Accuracy</div>
      </section>

      {/* Rotating Visualization */}
      <section className="rotating-viz fade-in">
        <h2 className="section-title" style={{ marginBottom: '30px' }}>Live Data Visualization</h2>
        <div className="viz-container">
          <div className={`viz-content ${currentVizIndex === 0 ? 'active' : ''}`}>
            <div className="chart-wrapper">
              <canvas ref={pieChartRef}></canvas>
            </div>
          </div>
          <div className={`viz-content ${currentVizIndex === 1 ? 'active' : ''}`}>
            <div className="chart-wrapper">
              <canvas ref={horizontalChartRef}></canvas>
            </div>
          </div>
          <div className={`viz-content ${currentVizIndex === 2 ? 'active' : ''}`}>
            <div className="chart-wrapper">
              <canvas ref={gaugeChartRef}></canvas>
            </div>
          </div>
          <div className={`viz-content ${currentVizIndex === 3 ? 'active' : ''}`}>
            <div className="chart-wrapper">
              <canvas ref={doughnutChartRef}></canvas>
            </div>
          </div>
          <div className="viz-indicators">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`indicator ${currentVizIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentVizIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Alliance Breakdown */}
      <section className="alliance-section fade-in">
        <h2 className="section-title">Alliance Breakdown</h2>
        <div className="alliance-grid">
          <div className="alliance-card">
            <h3 className="alliance-header nda">NDA Alliance Partners</h3>
            {ndaAlliance.map((party, index) => (
              <div key={index} className="party-item">
                <span className="party-name">{party.party}</span>
                <span className="party-seats">{party.seats_contested} Seats</span>
              </div>
            ))}
          </div>
          <div className="alliance-card">
            <h3 className="alliance-header mgb">MGB Alliance Partners</h3>
            {mgbAlliance.map((party, index) => (
              <div key={index} className="party-item">
                <span className="party-name">{party.party}</span>
                <span className="party-seats">{party.seats_contested} Seats</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-container">
        <div className="ticker-content">
          {[...tickerFacts, ...tickerFacts].map((fact, index) => (
            <span key={index} className="ticker-item">{fact}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">Powered by NNN AI Labs | Data-Driven Political Analytics</div>
          <div className="hashtags">
            <span className="hashtag">#BiharElections2025</span>
            <span className="hashtag">#AIInsight</span>
            <span className="hashtag">#DataPolitics</span>
          </div>
          <p className="disclaimer">
            These are AI-generated predictions based on data analysis and do not represent official results.
            Actual results may vary. For official results, please refer to the Election Commission of India.
          </p>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);