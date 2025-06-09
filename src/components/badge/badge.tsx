import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  count?: number;
};

const Badge: React.FC<BadgeProps> = ({ children, count }) => {
  return (
    <>
      <div className="relative">
        {children}
        {(count ?? 0) > 0 && (
          <div className="absolute -top-1 -right-3 bg-red-600 text-xs rounded-full px-1 text-white">
            <span>{count}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Badge;
