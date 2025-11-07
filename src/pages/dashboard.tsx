import { useAuth } from '../contexts/AuthContext';
import { SkeletonLoader } from '../components/SkeletonLoader';
import '../styles/root.css';

export default function Dashboard() {
    const { user, profile, loading } = useAuth();

    // Show skeleton while loading
    if (loading) {
        return (
            <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                <SkeletonLoader type="profile" />
            </div>
        );
    }

    // Get user's display name
    const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User';
    
    // Get avatar URL or generate placeholder
    const getAvatarDisplay = () => {
        if (profile?.avatar_url) {
            return <img src={profile.avatar_url} alt="Avatar" style={styles.avatar} />;
        }
        
        // Show initials as placeholder
        const initials = displayName.charAt(0).toUpperCase();
        return (
            <div style={styles.avatarPlaceholder}>
                {initials}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            {/* Header Section with User Info */}
            <div style={styles.header}>
                {getAvatarDisplay()}
                <div>
                    <h1 style={styles.welcome}>Welcome back, {displayName}!</h1>
                    <p style={styles.subtitle}>@{profile?.username || 'user'}</p>
                </div>
            </div>

            {/* Today's Events Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Today's Events</h2>
                <div style={styles.eventsContainer}>
                    <div style={styles.placeholder}>
                        <p style={styles.placeholderText}>📅 No events scheduled for today</p>
                        <p style={styles.placeholderSubtext}>
                            Events will appear here once the backend endpoints are connected.
                        </p>
                    </div>
                    {/* TODO: Replace with actual events from backend
                        - Fetch from API: GET /api/events?date=today&user_id={user.id}
                        - Display in cards or table format
                        - Add click handlers to view event details
                    */}
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Upcoming Events</h2>
                <div style={styles.eventsContainer}>
                    <div style={styles.placeholder}>
                        <p style={styles.placeholderText}>📆 No upcoming events</p>
                        <p style={styles.placeholderSubtext}>
                            Future events will be displayed here. Consider adding a calendar view!
                        </p>
                    </div>
                    {/* TODO: Replace with actual events from backend
                        - Fetch from API: GET /api/events?upcoming=true&user_id={user.id}
                        - Sort by date
                        - Show date, time, and location
                        - Add filters (this week, this month, etc.)
                    */}
                </div>
            </section>

            {/* Quick Stats Section (Optional) */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Quick Stats</h2>
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <p style={styles.statNumber}>0</p>
                        <p style={styles.statLabel}>Events Today</p>
                    </div>
                    <div style={styles.statCard}>
                        <p style={styles.statNumber}>0</p>
                        <p style={styles.statLabel}>This Week</p>
                    </div>
                    <div style={styles.statCard}>
                        <p style={styles.statNumber}>0</p>
                        <p style={styles.statLabel}>This Month</p>
                    </div>
                    <div style={styles.statCard}>
                        <p style={styles.statNumber}>0</p>
                        <p style={styles.statLabel}>Total Events</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Inline styles (you can move these to a CSS file later)
const styles = {
    container: {
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '40px',
        padding: '20px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '12px',
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover' as const,
        border: '3px solid var(--accent-color)',
    },
    avatarPlaceholder: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
    },
    welcome: {
        margin: '0',
        fontSize: '28px',
        fontWeight: '600',
    },
    subtitle: {
        margin: '5px 0 0 0',
        color: 'var(--text-secondary)',
        fontSize: '16px',
    },
    section: {
        marginBottom: '40px',
    },
    sectionTitle: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
        color: 'var(--text-primary)',
    },
    eventsContainer: {
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '12px',
        padding: '30px',
        minHeight: '200px',
    },
    placeholder: {
        textAlign: 'center' as const,
        padding: '40px 20px',
    },
    placeholderText: {
        fontSize: '18px',
        color: 'var(--text-primary)',
        marginBottom: '10px',
    },
    placeholderSubtext: {
        fontSize: '14px',
        color: 'var(--text-secondary)',
        maxWidth: '500px',
        margin: '0 auto',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
    },
    statCard: {
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '12px',
        padding: '30px',
        textAlign: 'center' as const,
        border: '2px solid var(--border-color)',
    },
    statNumber: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: 'var(--accent-color)',
        margin: '0 0 10px 0',
    },
    statLabel: {
        fontSize: '14px',
        color: 'var(--text-secondary)',
        margin: '0',
    },
};