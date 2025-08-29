
import React from 'react';
import { PrdMode } from '../types';
import { ChatBubbleIcon, DocumentIcon, RobotIcon, CheckIcon, LogoIcon } from './icons';

interface ModeSelectionProps {
  onSelectMode: (mode: PrdMode) => void;
}

const HowItWorksStep: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-500/10 text-indigo-400">
            {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const ModeCard: React.FC<{
  mode: PrdMode,
  title: string,
  stats: string,
  perfectFor: string,
  youGet: string,
  color: string,
  onClick: (mode: PrdMode) => void
}> = ({ mode, title, stats, perfectFor, youGet, color, onClick }) => (
    <div className={`flex flex-col bg-gray-800/50 border rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 ${color}`}>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-sm font-semibold text-gray-400 mt-1">{stats}</p>
        <div className="my-6 space-y-3 text-gray-300">
            <p><span className="font-semibold">Perfect for:</span> {perfectFor}</p>
            <p><span className="font-semibold">You'll get:</span> {youGet}</p>
        </div>
        <button
            onClick={() => onClick(mode)}
            className={`w-full mt-auto px-6 py-3 rounded-lg font-semibold text-white transition-colors ${color.replace('border', 'bg').replace('/50', '')} hover:opacity-90`}
        >
            Start {title} Mode
        </button>
    </div>
);

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => (
    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <h4 className="font-semibold text-white mb-2">{question}</h4>
        <p className="text-gray-400">{answer}</p>
    </div>
);

const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <LogoIcon className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold">PRD Architect</span>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">From App Idea to Working Product in 12 Steps</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">Generate a technical blueprint that any AI can follow to build your web app.</p>
        </section>

        {/* How It Works Section */}
        <section className="py-20 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <HowItWorksStep 
              icon={<ChatBubbleIcon className="w-8 h-8" />}
              title="1. Answer Simple Questions"
              description="Tell us about your app idea. We'll ask 5-12 questions based on your project size."
            />
            <HowItWorksStep 
              icon={<DocumentIcon className="w-8 h-8" />}
              title="2. Get Your Technical PRD"
              description="Receive a complete 12-phase development blueprint with exact prompts for No-Code tools."
            />
            <HowItWorksStep 
              icon={<RobotIcon className="w-8 h-8" />}
              title="3. Build With Any AI Tool"
              description="Take your PRD to Claude, ChatGPT, or any AI. They'll guide you step-by-step through building your app."
            />
          </div>
        </section>

        {/* Choose Your Path Section */}
        <section id="start" className="py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Choose Your Path</h2>
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <ModeCard 
                    mode={PrdMode.Quick}
                    title="Quick Start"
                    stats="5 questions, 5 minutes"
                    perfectFor="Simple apps, prototypes, personal projects"
                    youGet="Basic technical PRD with essential phases"
                    color="border-blue-500/50 hover:border-blue-500"
                    onClick={onSelectMode}
                />
                <ModeCard 
                    mode={PrdMode.Professional}
                    title="Professional"
                    stats="8 questions, 10 minutes"
                    perfectFor="Client projects, MVPs, small businesses"
                    youGet="Detailed PRD with database design, auth, and features"
                    color="border-purple-500/50 hover:border-purple-500"
                    onClick={onSelectMode}
                />
                <ModeCard 
                    mode={PrdMode.Enterprise}
                    title="Enterprise"
                    stats="12 questions, 20 minutes"
                    perfectFor="Funded startups, complex apps, investor-ready projects"
                    youGet="Complete blueprint with payments, AI integration, scaling"
                    color="border-green-500/50 hover:border-green-500"
                    onClick={onSelectMode}
                />
            </div>
        </section>
        
        {/* What You'll Receive Section */}
        <section className="py-20 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Your PRD Includes Everything You Need</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left">
                <div className="flex items-center gap-3"><CheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" /><span>Complete 12-phase development roadmap</span></div>
                <div className="flex items-center gap-3"><CheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" /><span>Exact prompts to paste into your No-Code tool</span></div>
                <div className="flex items-center gap-3"><CheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" /><span>Validation checkpoints for each phase</span></div>
                <div className="flex items-center gap-3"><CheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" /><span>Technical architecture diagrams</span></div>
                <div className="flex items-center gap-3"><CheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" /><span>Database schema specifications</span></div>
                <div className="flex items-center gap-3"><CheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" /><span>Tool-specific optimizations</span></div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
                <FAQItem 
                    question="What's a PRD?"
                    answer="A Product Requirements Document - your app's complete technical blueprint. It tells an AI developer exactly what to build, step by step."
                />
                <FAQItem 
                    question="Which No-Code tools work with this?"
                    answer="Lovable, Bolt, V0, Cursor, Windsurf, and most AI-powered builders that can interpret detailed, structured instructions."
                />
                <FAQItem 
                    question="Do I need coding knowledge?"
                    answer="No! The PRD tells the AI exactly what to build. You just copy and paste the prompts for each development phase. Your role is to be the project manager."
                />
            </div>
        </section>
      </main>

      <footer className="text-center py-12 border-t border-gray-800">
        <p className="text-lg text-gray-300">Ready to turn your idea into reality?</p>
        <p className="text-gray-400 mt-2">Choose your path above and start building.</p>
      </footer>
    </div>
  );
};

export default ModeSelection;