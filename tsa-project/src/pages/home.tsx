import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, profile } = useAuth();

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Welcome to Eventive</h1>
      
      {user ? (
        <div>
          <p>
            Hello, {profile?.display_name || user.email}! 👋
          </p>
          <p>You're logged in and ready to go.</p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/account" style={{ marginRight: '16px' }}>
              Go to Account
            </Link>
            <Link to="/settings">
              Go to Settings
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>Welcome! Please sign in to get started.</p>
          <Link to="/login">
            <button style={{ 
              marginTop: '16px',
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '8px',
              border: 'none',
              background: '#667eea',
              color: 'white'
            }}>
              Sign In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}