import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ResultsConsole } from './components/ResultsConsole';
import { generatePhishingEmail } from './services/geminiService';
import { MOCK_TARGETS } from './constants';
import type { Target, AttackParams, GeneratedEmail } from './types';
import { TargetInfo } from './components/TargetInfo';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [attackParams, setAttackParams] = useState<AttackParams>({
    ceoName: 'John Doe',
    projectName: 'Project Aquila',
    amount: '15,000 USD',
  });
  const [targetCount, setTargetCount] = useState<number>(10);
  const [generatedEmails, setGeneratedEmails] = useState<GeneratedEmail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleLaunchAttack = useCallback(async () => {
    setIsLoading(true);
    setGeneratedEmails([]);
    setProgress(0);

    const targetsToProcess = MOCK_TARGETS.slice(0, targetCount);

    for (let i = 0; i < targetsToProcess.length; i++) {
      const target = targetsToProcess[i];
      try {
        const result = await generatePhishingEmail(target, attackParams);
        setGeneratedEmails(prev => [...prev, {
          target,
          subject: result.subject,
          body: result.body,
          status: 'success'
        }]);
      } catch (error) {
        console.error('Failed to generate email for:', target.name, error);
        setGeneratedEmails(prev => [...prev, {
          target,
          subject: 'Generation Failed',
          body: `An error occurred while generating the email. Check the console for details.`,
          status: 'failed'
        }]);
      }
      setProgress(((i + 1) / targetsToProcess.length) * 100);
    }

    setIsLoading(false);
  }, [targetCount, attackParams]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 font-sans text-slate-700 dark:text-slate-300 flex flex-col items-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
             <TargetInfo totalTargets={MOCK_TARGETS.length} />
             <ControlPanel
                params={attackParams}
                setParams={setAttackParams}
                targetCount={targetCount}
                setTargetCount={setTargetCount}
                onLaunch={handleLaunchAttack}
                isLoading={isLoading}
                maxTargets={MOCK_TARGETS.length}
              />
          </div>
          <div className="lg:col-span-2">
            <ResultsConsole
              emails={generatedEmails}
              isLoading={isLoading}
              progress={progress}
              totalToGenerate={targetCount}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;