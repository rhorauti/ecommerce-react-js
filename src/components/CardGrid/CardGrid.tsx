import { ReactNode } from "react";

const CardGrid: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </>
  );
};

export default CardGrid;
