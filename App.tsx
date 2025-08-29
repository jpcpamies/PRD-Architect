
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ModeSelection from './components/ModeSelection';
import ChatInterface from './components/ChatInterface';
import PrdPreview from './components/PrdPreview';
import ProgressIndicator from './components/ProgressIndicator';
import { DocumentIcon, ArrowLeftIcon, ClipboardIcon, DownloadIcon, ChatBubbleIcon, LogoIcon } from './components/icons';
import { PrdMode, Message } from './types';
import PRD_SYSTEM from './prdSystemService';

// Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, onConfirm, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <div className="p-5 text-gray-300">{children}</div>
        <div className="p-4 bg-gray-900/50 rounded-b-lg flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-semibold transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm font-semibold transition-colors">Confirm</button>
        </div>
      </div>
    </div>
  );
};

const SESSION_STORAGE_KEY = 'prd-architect-session';

const App: React.FC = () => {
  const [appState, setAppState] = useState<'selection' | 'chatting' | 'result'>('selection');
  const [selectedMode, setSelectedMode] = useState<PrdMode | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [previewContent, setPreviewContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'chat' | 'preview'>('chat');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Load session from localStorage on initial render
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
      if (savedSession) {
        const { appState, selectedMode, questions, currentQuestionIndex, messages, userAnswers } = JSON.parse(savedSession);
        setAppState(appState);
        setSelectedMode(selectedMode);
        setQuestions(questions);
        setCurrentQuestionIndex(currentQuestionIndex);
        setMessages(messages);
        setUserAnswers(userAnswers);
        
        // Regenerate preview from saved answers
        const previewAnswers = [...userAnswers];
        for (let i = userAnswers.length; i < questions.length; i++) {
          previewAnswers.push('[Awaiting response...]');
        }
        const currentPreview = PRD_SYSTEM.generatePRD(selectedMode, previewAnswers);
        setPreviewContent(currentPreview);
      }
    } catch (error) {
      console.error("Failed to load session:", error);
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  // Save session to localStorage whenever state changes
  useEffect(() => {
    if (appState === 'chatting' && selectedMode) {
      const session = {
        appState,
        selectedMode,
        questions,
        currentQuestionIndex,
        messages,
        userAnswers
      };
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
  }, [appState, selectedMode, questions, currentQuestionIndex, messages, userAnswers]);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleModeSelect = useCallback((mode: PrdMode) => {
    const modeData = PRD_SYSTEM.modes[mode];
    setSelectedMode(mode);
    setQuestions(modeData.questions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setMessages([{ id: Date.now().toString(), sender: 'bot', text: modeData.questions[0] }]);
    
    const placeholders = Array(modeData.questions.length).fill('[Awaiting response...]');
    const initialPreview = PRD_SYSTEM.generatePRD(mode, placeholders);
    setPreviewContent(initialPreview);
  
    setAppState('chatting');
  }, []);
  
  const handleSendMessage = useCallback(async (userAnswer: string) => {
    if (!userAnswer.trim() || isGenerating) return;

    setIsGenerating(true);

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: userAnswer };
    const newAnswers = [...userAnswers, userAnswer];
    
    setMessages(prev => [...prev, userMessage]);
    setUserAnswers(newAnswers);

    const previewAnswers = [...newAnswers];
    for (let i = newAnswers.length; i < questions.length; i++) {
        previewAnswers.push('[Awaiting response...]');
    }
    const currentPreview = PRD_SYSTEM.generatePRD(selectedMode!, previewAnswers);
    setPreviewContent(currentPreview);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      const nextQuestion = questions[nextQuestionIndex];
      const botMessage: Message = { id: `${Date.now()}-bot`, sender: 'bot', text: nextQuestion };
      setMessages(prev => [...prev, botMessage]);
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
       const botMessage: Message = { id: `${Date.now()}-bot`, sender: 'bot', text: "That's everything! Generating your final PRD..." };
       setMessages(prev => [...prev, botMessage]);
       const finalPrd = PRD_SYSTEM.generatePRD(selectedMode!, newAnswers);
       setPreviewContent(finalPrd);
       setTimeout(() => {
        setAppState('result');
        localStorage.removeItem(SESSION_STORAGE_KEY);
       }, 1500);
    }

    setIsGenerating(false);

  }, [currentQuestionIndex, questions, isGenerating, userAnswers, selectedMode]);

  const handleEditAnswer = useCallback((messageId: string, newAnswer: string) => {
    let answerIndex = -1;
    let found = false;
    const updatedMessages = messages.map(msg => {
      if (msg.sender === 'user' && !found) {
        answerIndex++;
      }
      if (msg.id === messageId) {
        found = true;
        return { ...msg, text: newAnswer };
      }
      return msg;
    });

    if (answerIndex !== -1 && userAnswers[answerIndex] !== newAnswer) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[answerIndex] = newAnswer;

      setMessages(updatedMessages);
      setUserAnswers(updatedAnswers);
      
      const previewAnswers = [...updatedAnswers];
      for (let i = updatedAnswers.length; i < questions.length; i++) {
        previewAnswers.push('[Awaiting response...]');
      }
      const currentPreview = PRD_SYSTEM.generatePRD(selectedMode!, previewAnswers);
      setPreviewContent(currentPreview);
    }
  }, [messages, userAnswers, questions, selectedMode]);


  const handleReset = useCallback(() => {
    setIsModalOpen(false);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setAppState('selection');
    setSelectedMode(null);
    setMessages([]);
    setUserAnswers([]);
    setPreviewContent('');
  }, []);
  
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(previewContent);
      alert('PRD copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy PRD.');
    }
  }, [previewContent]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([previewContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prd-${selectedMode}-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [previewContent, selectedMode]);


  const renderChattingView = () => (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <LogoIcon className="w-7 h-7 text-indigo-400"/>
          <h1 className="text-lg font-bold">PRD Architect: <span className="text-indigo-400 capitalize">{selectedMode}</span></h1>
        </div>
        <div className="flex-grow max-w-sm px-4">
             <ProgressIndicator current={currentQuestionIndex + 1} total={questions.length} />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-semibold transition-colors"
        >
          Start Over
        </button>
      </header>
      
      <main className="flex-grow hidden md:grid md:grid-cols-5 gap-4 p-4 overflow-hidden">
        <div className="col-span-3 flex flex-col h-full max-h-[calc(100vh-80px)]">
          <ChatInterface messages={messages} onSendMessage={handleSendMessage} onEditMessage={handleEditAnswer} isGenerating={isGenerating} />
        </div>
        <div className="col-span-2 flex flex-col h-full max-h-[calc(100vh-80px)] bg-gray-800/50 rounded-lg border border-gray-700">
          <PrdPreview content={previewContent} />
        </div>
      </main>

      <main className="md:hidden flex-grow overflow-y-auto p-4 pb-20">
         {activeTab === 'chat' 
           ? <ChatInterface messages={messages} onSendMessage={handleSendMessage} onEditMessage={handleEditAnswer} isGenerating={isGenerating} /> 
           : <PrdPreview content={previewContent} />
         }
      </main>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 grid grid-cols-2 z-10">
          <button onClick={() => setActiveTab('chat')} className={`flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${activeTab === 'chat' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
              <ChatBubbleIcon className="w-5 h-5" /> Chat
          </button>
          <button onClick={() => setActiveTab('preview')} className={`flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
              <DocumentIcon className="w-5 h-5" /> Preview
          </button>
      </div>
    </div>
  );

  const renderResultView = () => (
    <div className="flex flex-col h-screen bg-gray-800/30">
       <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-3 flex justify-between items-center">
         <h1 className="text-lg font-bold text-white">Your PRD is Ready</h1>
         <div className="flex gap-2">
            <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-semibold transition-colors">
              <ClipboardIcon className="w-4 h-4" /> Copy
            </button>
            <button onClick={handleDownload} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm font-semibold transition-colors">
              <DownloadIcon className="w-4 h-4" /> Download
            </button>
         </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="bg-gray-800/50 rounded-lg border border-gray-700">
                <PrdPreview content={previewContent} />
            </div>
            <div className="mt-8 text-center">
                 <button onClick={handleReset} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold transition-colors flex items-center gap-2 mx-auto">
                    <ArrowLeftIcon className="w-5 h-5"/> Start New PRD
                 </button>
            </div>
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {appState === 'selection' && <ModeSelection onSelectMode={handleModeSelect} />}
      {appState === 'chatting' && renderChattingView()}
      {appState === 'result' && renderResultView()}
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleReset}
        title="Start Over?"
      >
        <p>Are you sure you want to start over? Your current progress will be lost.</p>
      </Modal>
    </div>
  );
};

export default App;