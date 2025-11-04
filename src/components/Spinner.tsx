/**
 * Loading Spinner Component
 * 
 * A simple animated spinner for inline loading states.
 * Use this when you want a small loading indicator instead of full skeleton.
 */

import '../styles/spinner.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function Spinner({ size = 'md', color }: SpinnerProps) {
  return (
    <div 
      className={`spinner spinner-${size}`}
      style={color ? { borderTopColor: color } : undefined}
    />
  );
}
