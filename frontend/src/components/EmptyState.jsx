import React from 'react';

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action = null,
  className = '' 
}) => {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export const NoTemplatesFound = ({ onReset }) => (
  <EmptyState
    icon={
      <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    }
    title="No templates found"
    description="Try adjusting your search terms or filters to find what you're looking for."
    action={
      <button
        onClick={onReset}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Clear filters
      </button>
    }
  />
);

export const NoSearchResults = ({ searchTerm, onClear }) => (
  <EmptyState
    icon={
      <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    }
    title={`No results for "${searchTerm}"`}
    description="We couldn't find any templates matching your search. Try different keywords."
    action={
      <button
        onClick={onClear}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        Clear search
      </button>
    }
  />
);

export const LoadingState = () => (
  <div className="text-center py-20">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
      <svg className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loading amazing templates...</h3>
    <p className="text-gray-600 dark:text-gray-400">We're gathering the best CSS templates for you</p>
  </div>
);

export default EmptyState;
