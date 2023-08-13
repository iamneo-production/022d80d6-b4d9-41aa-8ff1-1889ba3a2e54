import React from 'react';

const ErrorScreen: React.FC = () => {
  return (
    <div id='error_div' style={styles.errorDiv}>
      <h1 style={styles.errorHeading}>404 Page Not Found</h1>
      <div id='error_base_div' style={styles.errorBaseDiv}>
        <h2 style={styles.rainbowText}>Oh no!</h2>
        <h3 style={styles.rainbowText}>Looks like you are lost.</h3>
      </div>
    </div>
  );
};

interface Styles {
  errorDiv: React.CSSProperties;
  errorHeading: React.CSSProperties;
  errorBaseDiv: React.CSSProperties;
  rainbowText: React.CSSProperties;
}

const styles: Styles = {
  errorDiv: {
    textAlign: 'center',
    marginTop: '100px',
  },
  errorHeading: {
    color: 'black',
    fontSize: '48px',
    fontFamily: 'Arial, sans-serif',
  },
  errorBaseDiv: {
    marginTop: '20px',
  },
  rainbowText: {
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
    animation: 'rainbow 2s infinite',
  },
};

export default ErrorScreen;
