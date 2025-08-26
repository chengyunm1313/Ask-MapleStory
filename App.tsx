import React, { useState, useCallback } from 'react';

const WEBHOOK_URL = 'https://hook.us2.make.com/7p5o91uasyjpq9ugq3z1vgs7fmo5r7ui';

// --- Helper Components (Defined outside the main App component) ---

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center my-4">
    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-teal-500"></div>
    <p className="ml-4 text-gray-600">正在尋找答案，請稍候...</p>
  </div>
);

interface DiscoveryDisplayProps {
  content: string;
}

const DiscoveryDisplay: React.FC<DiscoveryDisplayProps> = ({ content }) => (
  <div className="mt-8 w-full animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-teal-300 pb-2">🏝️ 冒險發現</h2>
    <div className="bg-teal-50 p-6 rounded-lg shadow-inner">
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
  </div>
);

interface ErrorDisplayProps {
    message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
    <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md animate-fade-in" role="alert">
        <p className="font-bold">噢不，冒險出錯了！</p>
        <p>{message}</p>
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [discovery, setDiscovery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartAdventure = useCallback(async () => {
    if (!question.trim()) {
      setError('問題不能是空的喔！');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDiscovery(null);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`網路錯誤，狀態碼: ${response.status}`);
      }

      const responseData = await response.text();
      setDiscovery(responseData);

    } catch (err) {
      if (err instanceof Error) {
        setError(`冒險旅途中發生意外：${err.message}`);
      } else {
        setError('發生未知錯誤，請再試一次。');
      }
    } finally {
      setIsLoading(false);
    }
  }, [question]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 selection:bg-teal-200">
      <main className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            問問冒險島
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            在這裡，每個「為什麼」都是一場新的冒險。
          </p>
        </header>

        <div className="w-full">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="在這裡問一個「為什麼」的問題吧！例如：為什麼天空是藍色的？"
            className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-shadow duration-200 shadow-sm resize-none text-base"
            disabled={isLoading}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleStartAdventure}
            disabled={isLoading || !question.trim()}
            className="px-8 py-3 bg-teal-500 text-white font-bold text-lg rounded-full hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            {isLoading ? '探索中...' : '🚀 開始冒險'}
          </button>
        </div>
        
        {isLoading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} />}
        {discovery && <DiscoveryDisplay content={discovery} />}

      </main>

      <footer className="text-center mt-8 text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} 問問冒險島. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
