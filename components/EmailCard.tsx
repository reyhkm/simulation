import React from 'react';
import type { GeneratedEmail, AttackParams, EmailBody } from '../types';

interface EmailCardProps {
  email: GeneratedEmail;
  params: AttackParams;
}

const SenderAvatar: React.FC<{ ceoName: string }> = ({ ceoName }) => {
    const initial = ceoName.charAt(0).toUpperCase();
    return (
        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-lg font-bold text-slate-500 dark:text-slate-400 mr-4">
            {initial}
        </div>
    );
};

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="text-sm">
        <span className="text-slate-500 dark:text-slate-400">{label}: </span>
        <span className="text-slate-700 dark:text-slate-300">{value}</span>
    </div>
);


export const EmailCard: React.FC<EmailCardProps> = ({ email, params }) => {
  const isSuccess = email.status === 'success';
  const ceoEmailDomain = email.target.company.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
  const ceoEmailAddress = `${params.ceoName.toLowerCase().replace(' ', '.')}@${ceoEmailDomain}`;

  const renderBody = () => {
    // When generation fails, the body is a simple string.
    if (typeof email.body === 'string') {
      return (
        <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
          {email.body}
        </p>
      );
    } else {
      // On success, the body is a structured object.
      return (
        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>{email.body.greeting}</p>
          {email.body.paragraphs.map((p, i) => (
            <p key={i} className="mt-4">{p}</p>
          ))}
          <p className="mt-4">{email.body.closing}</p>
          <p className="mt-1">{email.body.signature}</p>
        </div>
      );
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-800/70 p-4 rounded-lg border border-slate-200 dark:border-slate-700 animate-fade-in shadow-md transition-all`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center">
            <SenderAvatar ceoName={params.ceoName} />
            <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">{params.ceoName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">To: {email.target.name}</p>
            </div>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isSuccess ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
            {isSuccess ? 'Success' : 'Failed'}
        </span>
      </div>

      <div className="mt-4 space-y-1">
        <DetailRow label="From" value={<>{params.ceoName} &lt;{ceoEmailAddress}&gt;</>} />
        <DetailRow label="To" value={<>{email.target.name} &lt;...&gt;</>} />
        <DetailRow label="Subject" value={<strong className={isSuccess ? 'text-slate-800 dark:text-slate-100' : 'text-red-600 dark:text-red-400'}>{email.subject}</strong>} />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        {renderBody()}
      </div>
    </div>
  );
};
