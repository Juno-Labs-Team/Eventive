/**
 * Skeleton Loader Component
 * 
 * Shows a loading placeholder while content is being fetched.
 * Reusable across the app - just drop it in wherever you need a loading state.
 */

import '../styles/skeleton.css';

interface SkeletonLoaderProps {
  type?: 'text' | 'avatar' | 'card' | 'profile';
  count?: number;
}

export function SkeletonLoader({ type = 'text', count = 1 }: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === 'profile') {
    return (
      <div className="skeleton-profile">
        <div className="skeleton-avatar-large"></div>
        <div className="skeleton-profile-info">
          <div className="skeleton-text skeleton-title"></div>
          <div className="skeleton-text skeleton-subtitle"></div>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="skeleton-card">
        {skeletons.map((i) => (
          <div key={i} className="skeleton-card-item">
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text skeleton-line"></div>
            <div className="skeleton-text skeleton-line"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'avatar') {
    return (
      <div className="skeleton-avatar"></div>
    );
  }

  // Default: text lines
  return (
    <div className="skeleton-container">
      {skeletons.map((i) => (
        <div key={i} className="skeleton-text skeleton-line"></div>
      ))}
    </div>
  );
}
