import React from 'react';

interface TargetInfoProps {
  totalTargets: number;
}

const DatabaseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 11c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 15c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
);

export const TargetInfo: React.FC<TargetInfoProps> = ({ totalTargets }) => {
    return (
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 shadow-lg flex items-center space-x-4">
            <DatabaseIcon />
            <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Target Database</h2>
                <p className="text-slate-600 dark:text-slate-400">
                    Simulating a database of <strong className="text-cyan-600 dark:text-cyan-400">{totalTargets}</strong> public profiles ready for targeting.
                </p>
            </div>
        </div>
    );
};