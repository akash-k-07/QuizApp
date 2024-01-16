import React from 'react';

const Header = () => {
  return (
    <nav className="bg-blue-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img src="/images/quiz.png" alt="" width="50" />
              <span className="uppercase text-slate-200 text-lg font-bold tracking-widest"> Quiz</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;