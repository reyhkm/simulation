import React from 'react';
import type { GeneratedEmail } from '../types';
import { EmailCard } from './EmailCard';
import { ProgressBar } from './ProgressBar';

interface ResultsConsoleProps {
  emails: GeneratedEmail[];
  isLoading: boolean;
  progress: number;
  totalToGenerate: number;
}

export const ResultsConsole: React.FC<ResultsConsoleProps> = ({ emails, isLoading, progress, totalToGenerate }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 shadow-lg h-full min-h-[600px] flex flex-col">
      <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Generation Console</h2>
      
      {isLoading && (
        <div className="mb-4">
          <ProgressBar progress={progress} />
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
            Generating email {emails.length + 1} of {totalToGenerate}...
          </p>
        </div>
      )}

      {!isLoading && emails.length > 0 && (
         <div className="mb-4 bg-green-100 border border-green-400 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300 px-4 py-2 rounded-md text-sm">
            Generation complete. {emails.filter(e => e.status === 'success').length} emails successfully generated.
         </div>
      )}

      <div className="flex-grow overflow-y-auto pr-2 space-y-4 h-96">
        {emails.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">
            <p>Results will be displayed here once generation starts.</p>
          </div>
        )}
        {emails.map((email, index) => (
          <EmailCard key={index} email={email} />
        ))}
      </div>
    </div>
  );
};