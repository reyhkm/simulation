import React from 'react';
import type { AttackParams } from '../types';

interface ControlPanelProps {
  params: AttackParams;
  setParams: React.Dispatch<React.SetStateAction<AttackParams>>;
  targetCount: number;
  setTargetCount: (count: number) => void;
  onLaunch: () => void;
  isLoading: boolean;
  maxTargets: number;
}

const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
    />
  </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({ params, setParams, targetCount, setTargetCount, onLaunch, isLoading, maxTargets }) => {
  const handleParamChange = (field: keyof AttackParams) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">1. Configure Scenario</h2>
      <div className="space-y-4">
        <InputField label="CEO Name (Persona)" value={params.ceoName} onChange={handleParamChange('ceoName')} />
        <InputField label="Secret Project Name" value={params.projectName} onChange={handleParamChange('projectName')} />
        <InputField label="Amount to Transfer" value={params.amount} onChange={handleParamChange('amount')} />
      </div>

      <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mt-6 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">2. Set Scale</h2>
       <div>
        <label htmlFor="targetCount" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Number of Targets: <span className="font-bold text-slate-900 dark:text-white">{targetCount}</span>
        </label>
        <input
          id="targetCount"
          type="range"
          min="1"
          max={maxTargets}
          value={targetCount}
          onChange={(e) => setTargetCount(Number(e.target.value))}
          className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <button
        onClick={onLaunch}
        disabled={isLoading}
        className="mt-8 w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-3 px-4 rounded-lg hover:from-red-700 hover:to-rose-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Launch Generation'
        )}
      </button>
    </div>
  );
};