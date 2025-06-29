import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
         `http://localhost:5000/weather?city=${city}`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        icon: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: data.visibility / 1000,
        pressure: data.main.pressure
      });
    } catch (error) {
      setError('Failed to fetch weather data. Please check the city name.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const getWeatherIcon = (iconType) => {
    const iconStyle = { 
      fontSize: '4rem', 
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
      display: 'inline-block',
      animation: 'float 3s ease-in-out infinite'
    };
    
    switch (iconType) {
      case 'Clear':
        return <span style={{...iconStyle, color: '#FCD34D'}}>☀️</span>;
      case 'Clouds':
        return <span style={{...iconStyle, color: '#E5E7EB'}}>☁️</span>;
      case 'Rain':
        return <span style={{...iconStyle, color: '#93C5FD'}}>🌧️</span>;
      case 'Snow':
        return <span style={{...iconStyle, color: '#DBEAFE'}}>❄️</span>;
      case 'Thunderstorm':
        return <span style={{...iconStyle, color: '#FBBF24'}}>⛈️</span>;
      default:
        return <span style={{...iconStyle, color: '#FCD34D'}}>🌤️</span>;
    }
  };

  const getBackgroundGradient = () => {
    if (!weather) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    switch (weather.icon) {
      case 'Clear':
        return 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #DC2626 100%)';
      case 'Clouds':
        return 'linear-gradient(135deg, #6B7280 0%, #4F46E5 50%, #374151 100%)';
      case 'Rain':
        return 'linear-gradient(135deg, #1E3A8A 0%, #3730A3 50%, #1F2937 100%)';
      case 'Snow':
        return 'linear-gradient(135deg, #DBEAFE 0%, #3B82F6 50%, #2563EB 100%)';
      case 'Thunderstorm':
        return 'linear-gradient(135deg, #1F2937 0%, #581C87 50%, #000000 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: getBackgroundGradient(),
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transition: 'all 1s ease-in-out'
    },
    backgroundElement1: {
      position: 'absolute',
      top: '25%',
      left: '25%',
      width: '18rem',
      height: '18rem',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 2s infinite'
    },
    backgroundElement2: {
      position: 'absolute',
      bottom: '25%',
      right: '25%',
      width: '24rem',
      height: '24rem',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 2s infinite',
      animationDelay: '1s'
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 10,
      padding: '2rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    title: {
      fontSize: '3.75rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem',
      letterSpacing: '-0.025em',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: 'rgba(255,255,255,0.9)',
      fontWeight: '300'
    },
    searchContainer: {
      maxWidth: '28rem',
      margin: '0 auto 3rem auto',
      position: 'relative'
    },
    searchInput: {
      width: '100%',
      padding: '1rem 1.5rem',
      fontSize: '1.125rem',
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '1rem',
      color: 'white',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    searchButton: {
      position: 'absolute',
      right: '0.5rem',
      top: '0.5rem',
      bottom: '0.5rem',
      padding: '0 1.5rem',
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      border: 'none',
      borderRadius: '0.75rem',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    errorMessage: {
      maxWidth: '28rem',
      margin: '0 auto 2rem auto',
      background: 'rgba(239, 68, 68, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '0.75rem',
      padding: '1rem 1.5rem',
      color: 'white',
      textAlign: 'center'
    },
    weatherCard: {
      maxWidth: '64rem',
      margin: '0 auto 2rem auto',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1.5rem',
      padding: '2rem',
      border: '1px solid rgba(255,255,255,0.2)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
      transform: 'scale(1)',
      transition: 'transform 0.5s ease'
    },
    weatherHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    locationInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    cityName: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: 'white'
    },
    weatherGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      alignItems: 'center'
    },
    tempSection: {
      textAlign: 'left'
    },
    temperature: {
      fontSize: '5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.5rem',
      lineHeight: '1'
    },
    description: {
      fontSize: '1.5rem',
      color: 'rgba(255,255,255,0.9)',
      textTransform: 'capitalize',
      marginBottom: '0.5rem'
    },
    feelsLike: {
      fontSize: '1.125rem',
      color: 'rgba(255,255,255,0.8)'
    },
    statsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '0.75rem'
    },
    statLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: 'white'
    },
    statValue: {
      color: 'white',
      fontWeight: '600'
    },
    additionalCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      maxWidth: '64rem',
      margin: '0 auto'
    },
    additionalCard: {
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(255,255,255,0.2)',
      textAlign: 'center',
      transform: 'scale(1)',
      transition: 'transform 0.3s ease'
    },
    cardValue: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.5rem'
    },
    cardLabel: {
      color: 'rgba(255,255,255,0.8)'
    },
    welcomeCard: {
      maxWidth: '32rem',
      margin: '0 auto',
      textAlign: 'center',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1.5rem',
      padding: '3rem',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    welcomeEmoji: {
      fontSize: '3.75rem',
      marginBottom: '1.5rem'
    },
    welcomeTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem'
    },
    welcomeText: {
      fontSize: '1.125rem',
      color: 'rgba(255,255,255,0.9)'
    },
    spinner: {
      width: '1.25rem',
      height: '1.25rem',
      border: '2px solid white',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        input::placeholder {
          color: rgba(255,255,255,0.7);
        }
        input:focus {
          background: rgba(255,255,255,0.3);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 0 0 4px rgba(255,255,255,0.1);
        }
        button:hover {
          background: rgba(255,255,255,0.3) !important;
        }
        .weather-card:hover {
          transform: scale(1.02) !important;
        }
        .additional-card:hover {
          transform: scale(1.05) !important;
        }
        @media (max-width: 768px) {
          .weather-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .weather-header {
            flex-direction: column;
            text-align: center;
          }
          .temp-section {
            text-align: center !important;
          }
        }
      `}</style>
      
      {/* Animated background elements */}
      <div style={styles.backgroundElement1}></div>
      <div style={styles.backgroundElement2}></div>

      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>WeatherScope</h1>
          <p style={styles.subtitle}>Discover weather around the world</p>
        </div>

        {/* Search Section */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name..."
            style={styles.searchInput}
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            style={styles.searchButton}
          >
            {loading ? (
              <div style={styles.spinner}></div>
            ) : (
              <span style={{fontSize: '1.25rem'}}>🔍</span>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Weather Display */}
        {weather && (
          <div>
            {/* Main Weather Card */}
            <div style={styles.weatherCard} className="weather-card">
              <div style={styles.weatherHeader}>
                <div style={styles.locationInfo}>
                  <span style={{color: 'rgba(255,255,255,0.8)', fontSize: '1.5rem'}}>📍</span>
                  <h2 style={styles.cityName}>
                    {weather.city}, {weather.country}
                  </h2>
                </div>
                {getWeatherIcon(weather.icon)}
              </div>

              <div style={styles.weatherGrid} className="weather-grid">
                <div style={styles.tempSection} className="temp-section">
                  <div style={styles.temperature}>
                    {weather.temp}°
                  </div>
                  <div style={styles.description}>
                    {weather.description}
                  </div>
                  <div style={styles.feelsLike}>
                    Feels like {weather.feelsLike}°C
                  </div>
                </div>

                <div style={styles.statsGrid}>
                  <div style={styles.statItem}>
                    <div style={styles.statLabel}>
                      <span style={{fontSize: '1.25rem'}}>🌡️</span>
                      <span>Temperature</span>
                    </div>
                    <span style={styles.statValue}>{weather.temp}°C</span>
                  </div>

                  <div style={styles.statItem}>
                    <div style={styles.statLabel}>
                      <span style={{fontSize: '1.25rem'}}>💧</span>
                      <span>Humidity</span>
                    </div>
                    <span style={styles.statValue}>{weather.humidity}%</span>
                  </div>

                  <div style={styles.statItem}>
                    <div style={styles.statLabel}>
                      <span style={{fontSize: '1.25rem'}}>💨</span>
                      <span>Wind Speed</span>
                    </div>
                    <span style={styles.statValue}>{weather.windSpeed} m/s</span>
                  </div>

                  <div style={styles.statItem}>
                    <div style={styles.statLabel}>
                      <span style={{fontSize: '1.25rem'}}>👁️</span>
                      <span>Visibility</span>
                    </div>
                    <span style={styles.statValue}>{weather.visibility} km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div style={styles.additionalCards}>
              <div style={styles.additionalCard} className="additional-card">
                <div style={styles.cardValue}>{weather.humidity}%</div>
                <div style={styles.cardLabel}>Humidity</div>
              </div>

              <div style={styles.additionalCard} className="additional-card">
                <div style={styles.cardValue}>{weather.windSpeed}</div>
                <div style={styles.cardLabel}>Wind (m/s)</div>
              </div>

              <div style={styles.additionalCard} className="additional-card">
                <div style={styles.cardValue}>{weather.pressure}</div>
                <div style={styles.cardLabel}>Pressure (hPa)</div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {!weather && !loading && (
          <div style={styles.welcomeCard}>
            <div style={styles.welcomeEmoji}>🌤️</div>
            <h3 style={styles.welcomeTitle}>
              Welcome to WeatherScope
            </h3>
            <p style={styles.welcomeText}>
              Enter a city name above to get started and explore real-time weather conditions with beautiful, detailed insights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
