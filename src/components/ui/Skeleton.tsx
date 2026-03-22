import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton = ({ className = '', variant = 'rect', ...props }: SkeletonProps) => {
  const variants = {
    text: 'h-3 w-full rounded-md',
    rect: 'h-24 w-full rounded-xl',
    circle: 'h-10 w-10 rounded-full',
  };

  return (
    <div
      className={`shimmer bg-zinc-900 ${variants[variant]} ${className}`}
      {...props}
    />
  );
};
