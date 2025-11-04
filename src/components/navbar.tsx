import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Eventive
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/account" className="navbar-link">
                Account
              </Link>
              <Link to="/settings" className="navbar-link">
                Settings
              </Link>
              <div className="navbar-user">
                {profile?.avatar_url && (
                  <img 
                    src={profile.avatar_url} 
                    alt="Avatar" 
                    className="navbar-avatar"
                  />
                )}
                <span className="navbar-username">
                  {profile?.display_name || user.email?.split('@')[0]}
                </span>
              </div>
              <button onClick={handleSignOut} className="navbar-button">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-button">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}