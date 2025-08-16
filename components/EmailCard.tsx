import React from 'react';
import type { GeneratedEmail } from '../types';

interface EmailCardProps {
  email: GeneratedEmail;
}

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 text-slate-500 dark:text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

export const EmailCard: React.FC<EmailCardProps> = ({ email }) => {
  const isSuccess = email.status === 'success';
  const borderColor = isSuccess ? 'border-l-green-500' : 'border-l-red-500';

  return (
    <div className={`bg-white dark:bg-slate-800 p-4 rounded-md border-l-4 ${borderColor} animate-fade-in shadow-md`}>
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
        <UserIcon />
        <strong>To:</strong><span className="ml-2">{email.target.name} &lt;...&gt;</span>
        <span className="ml-auto text-xs">{email.target.company}</span>
      </div>
      <h3 className={`font-bold ${isSuccess ? 'text-slate-800 dark:text-slate-100' : 'text-red-600 dark:text-red-400'}`}>
        Subject: {email.subject}
      </h3>
      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-mono">
          {email.body}
        </p>
      </div>
    </div>
  );
};