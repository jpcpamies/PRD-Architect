import React from 'react';
import { PrdMode } from '../types';
import { ChatBubbleIcon, DocumentIcon, RobotIcon, CheckIcon, LogoIcon } from './icons';

interface ModeSelectionProps {
  onSelectMode: (mode: PrdMode) => void;
}

const HowItWorksStep: React.FC<{ icon: React.ReactNode, title: string, description: string, stepNumber: number }> = ({ icon, title, description, stepNumber }) => (
    <div className="relative group">
        <div className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-indigo-400/30 transition-all duration-300 h-full">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {stepNumber}
            </div>
            <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="mb-4 text-xl font-bold text-white leading-tight">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

const ProfileRoadblockCard: React.FC<{
  icon: string;
  title: string;
  fears: string[];
  objections: string[];
  pains: string[];
  helpText: string;
  ctaText: string;
  ctaMode: PrdMode;
  onCtaClick: (mode: PrdMode) => void;
  color: string;
  accent: string;
}> = ({ icon, title, fears, objections, pains, helpText, ctaText, ctaMode, onCtaClick, color, accent }) => (
  <div className={`group relative flex flex-col bg-gradient-to-br from-gray-800/60 to-gray-900/60 border rounded-2xl p-8 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl backdrop-blur-sm ${color} hover:shadow-${accent}-500/20`}>
    <div className="flex items-center gap-5 mb-6">
      <div className={`text-5xl p-3 rounded-xl bg-gradient-to-br from-${accent}-500/20 to-${accent}-600/20`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white leading-tight">{title}</h3>
    </div>
    
    <div className="space-y-6 text-sm text-gray-300 flex-grow">
      <div className="bg-gray-800/40 rounded-lg p-4">
        <h4 className={`font-semibold text-${accent}-400 mb-2 flex items-center gap-2`}>
          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
          Fears & Concerns
        </h4>
        <ul className="space-y-1">
          {fears.map((fear, i) => <li key={i} className="text-gray-400">• "{fear}"</li>)}
        </ul>
      </div>
      
      <div className="bg-gray-800/40 rounded-lg p-4">
        <h4 className={`font-semibold text-${accent}-400 mb-2 flex items-center gap-2`}>
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          Common Objections
        </h4>
        <ul className="space-y-1">
          {objections.map((obj, i) => <li key={i} className="text-gray-400">• "{obj}"</li>)}
        </ul>
      </div>
      
      <div className="bg-gray-800/40 rounded-lg p-4">
        <h4 className={`font-semibold text-${accent}-400 mb-2 flex items-center gap-2`}>
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          Pain Points
        </h4>
        <ul className="space-y-1">
          {pains.map((pain, i) => <li key={i} className="text-gray-400">• {pain}</li>)}
        </ul>
      </div>
      
      <div className={`bg-gradient-to-r from-${accent}-500/10 to-${accent}-600/10 rounded-lg p-4 border border-${accent}-500/30`}>
        <h4 className={`font-semibold text-${accent}-400 mb-2 flex items-center gap-2`}>
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          How We Solve This
        </h4>
        <p className="text-gray-300 leading-relaxed">{helpText}</p>
      </div>
    </div>
    
    <button
      onClick={() => onCtaClick(ctaMode)}
      className={`w-full mt-8 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r from-${accent}-600 to-${accent}-700 hover:from-${accent}-500 hover:to-${accent}-600 hover:shadow-lg hover:shadow-${accent}-500/30 transform hover:scale-105`}
    >
      {ctaText}
    </button>
  </div>
);

const ModeCard: React.FC<{
  mode: PrdMode,
  title: string,
  stats: string,
  perfectFor: string,
  youGet: string,
  color: string,
  accent: string,
  recommended?: boolean,
  onClick: (mode: PrdMode) => void
}> = ({ mode, title, stats, perfectFor, youGet, color, accent, recommended, onClick }) => (
    <div className={`relative group flex flex-col bg-gradient-to-br from-gray-800/60 to-gray-900/60 border rounded-2xl p-8 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl backdrop-blur-sm ${color} hover:shadow-${accent}-500/20 ${recommended ? 'ring-2 ring-indigo-500/50' : ''}`}>
        {recommended && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                Most Popular
            </div>
        )}
        
        <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
            <p className={`text-sm font-semibold text-${accent}-400 bg-${accent}-500/10 px-3 py-1 rounded-full inline-block`}>
                {stats}
            </p>
        </div>
        
        <div className="space-y-4 text-gray-300 flex-grow">
            <div className="bg-gray-800/40 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">Perfect for:</p>
                <p className="text-gray-400">{perfectFor}</p>
            </div>
            
            <div className="bg-gray-800/40 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">You'll get:</p>
                <p className="text-gray-400">{youGet}</p>
            </div>
        </div>
        
        <button
            onClick={() => onClick(mode)}
            className={`w-full mt-8 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r from-${accent}-600 to-${accent}-700 hover:from-${accent}-500 hover:to-${accent}-600 hover:shadow-lg hover:shadow-${accent}-500/30 transform hover:scale-105 group-hover:shadow-xl`}
        >
            Start {title} Mode →
        </button>
    </div>
);

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => (
    <div className="group p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-indigo-400/30 transition-all duration-300">
        <h4 className="font-semibold text-white mb-3 text-lg group-hover:text-indigo-400 transition-colors">{question}</h4>
        <p className="text-gray-400 leading-relaxed">{answer}</p>
    </div>
);

const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <header className="py-8 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-gray-900/50 border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
              <LogoIcon className="w-8 h-8 text-indigo-400" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              PRD Architect
            </span>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center py-24">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
                From App Idea to{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Working Product
                </span>{' '}
                in 12 Steps
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
                Generate a comprehensive technical blueprint that any AI developer can follow to build your web application from concept to deployment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#start" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Get Started Now →
                </a>
                <div className="text-sm text-gray-500">
                  ✨ Free • No signup required • Ready in minutes
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Three simple steps to transform your app idea into a actionable development roadmap
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <HowItWorksStep 
                stepNumber={1}
                icon={<ChatBubbleIcon className="w-10 h-10" />}
                title="Answer Simple Questions"
                description="Tell us about your app vision. We'll guide you through 5-12 focused questions based on your project complexity and goals."
              />
              <HowItWorksStep 
                stepNumber={2}
                icon={<DocumentIcon className="w-10 h-10" />}
                title="Get Your Technical PRD"
                description="Receive a detailed 12-phase development blueprint with precise prompts and specifications for any AI development tool."
              />
              <HowItWorksStep 
                stepNumber={3}
                icon={<RobotIcon className="w-10 h-10" />}
                title="Build With Any AI Tool"
                description="Take your PRD to Claude, ChatGPT, Cursor, or any AI builder. Follow the step-by-step guidance to create your app."
              />
            </div>
          </section>

          {/* Does This Sound Like You Section */}
          <section className="py-24">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Does This Sound Like You?</h2>
                  <p className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
                      Three different profiles, same roadblocks. Here's how we solve them.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-6 py-2 rounded-full border border-indigo-500/30">
                      <span className="text-indigo-400 font-semibold">✨ No blank canvas. A guided plan.</span>
                  </div>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  <ProfileRoadblockCard
                      icon="🎨"
                      title="Busy Creative"
                      fears={["I'm not technical enough", "I'll break something important"]}
                      objections={["Tutorials never match reality", "I don't have weeks to learn"]}
                      pains={["Overwhelming blank canvas", "Technical jargon (APIs, databases)", "Analysis paralysis"]}
                      helpText="Our step-by-step assistant generates a guided PRD with sequential prompts, so any AI can build your app without requiring coding knowledge."
                      ctaText="Start with Quick (5 min) →"
                      ctaMode={PrdMode.Quick}
                      onCtaClick={onSelectMode}
                      color="border-blue-500/50 hover:border-blue-400"
                      accent="blue"
                  />
                  <ProfileRoadblockCard
                      icon="💼"
                      title="Blocked Professional"
                      fears={["Third-party integrations failing", "Solution won't scale properly"]}
                      objections={["No-code tools are just toys", "Vendor lock-in is a trap"]}
                      pains={["Complex Stripe/CRM/API connections", "Conditional logic implementation", "Time wasted on wrong approaches"]}
                      helpText="Get a PRD with integration recipes, phase-by-phase validations, and escape routes with prompts for advanced edge cases."
                      ctaText="Start with Professional (8 questions) →"
                      ctaMode={PrdMode.Professional}
                      onCtaClick={onSelectMode}
                      color="border-purple-500/50 hover:border-purple-400"
                      accent="purple"
                  />
                  <ProfileRoadblockCard
                      icon="🧪"
                      title="Curious Enthusiast"
                      fears={["Getting stuck without understanding the underlying logic"]}
                      objections={["There must be hidden complexity I'm missing"]}
                      pains={["Complex data relationships", "Application state management", "Debugging without context"]}
                      helpText="Receive a PRD with detailed explanations, learning checkpoints, and comprehensive debugging prompts. Learn while you build."
                      ctaText="Start with Enterprise (12 steps) →"
                      ctaMode={PrdMode.Enterprise}
                      onCtaClick={onSelectMode}
                      color="border-green-500/50 hover:border-green-400"
                      accent="green"
                  />
              </div>
          </section>

          {/* Choose Your Path Section */}
          <section id="start" className="py-24">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Choose Your Development Path</h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                      Select the approach that matches your project complexity and time investment
                  </p>
              </div>
              <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  <ModeCard 
                      mode={PrdMode.Quick}
                      title="Quick Start"
                      stats="5 questions • 5 minutes"
                      perfectFor="Simple apps, prototypes, personal projects, proof of concepts"
                      youGet="Essential technical PRD with core development phases and basic architecture"
                      color="border-blue-500/50 hover:border-blue-400"
                      accent="blue"
                      onClick={onSelectMode}
                  />
                  <ModeCard 
                      mode={PrdMode.Professional}
                      title="Professional"
                      stats="8 questions • 10 minutes"
                      perfectFor="Client projects, MVPs, small business applications, startup launches"
                      youGet="Comprehensive PRD with database design, authentication, and advanced features"
                      color="border-purple-500/50 hover:border-purple-400"
                      accent="purple"
                      recommended={true}
                      onClick={onSelectMode}
                  />
                  <ModeCard 
                      mode={PrdMode.Enterprise}
                      title="Enterprise"
                      stats="12 questions • 20 minutes"
                      perfectFor="Funded startups, complex applications, investor-ready products, enterprise solutions"
                      youGet="Complete blueprint with payments, AI integration, scaling strategy, and deployment"
                      color="border-green-500/50 hover:border-green-400"
                      accent="green"
                      onClick={onSelectMode}
                  />
              </div>
          </section>
          
          {/* What You'll Receive Section */}
          <section className="py-24">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Your PRD Includes Everything You Need</h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                      A complete technical blueprint that bridges the gap between your vision and actual development
                  </p>
              </div>
              <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/30">
                          <CheckIcon className="w-8 h-8 text-green-400 flex-shrink-0" />
                          <span className="text-lg">Complete 12-phase development roadmap</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/30">
                          <CheckIcon className="w-8 h-8 text-green-400 flex-shrink-0" />
                          <span className="text-lg">Exact prompts for AI development tools</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/30">
                          <CheckIcon className="w-8 h-8 text-green-400 flex-shrink-0" />
                          <span className="text-lg">Validation checkpoints for each phase</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/30">
                          <CheckIcon className="w-8 h-8 text-green-400 flex-shrink-0" />
                          <span className="text-lg">Technical architecture diagrams</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/30">
                          <CheckIcon className="w-8 h-8 text-green-400 flex-shrink-0" />
                          <span className="text-lg">Database schema specifications</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/30">
                          <CheckIcon className="w-8 h-8 text-green-400 flex-shrink-0" />
                          <span className="text-lg">Platform-specific optimizations</span>
                      </div>
                  </div>
              </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                      Everything you need to know about creating your technical blueprint
                  </p>
              </div>
              <div className="max-w-4xl mx-auto space-y-6">
                  <FAQItem 
                      question="What exactly is a PRD and why do I need one?"
                      answer="A Product Requirements Document (PRD) is your app's complete technical blueprint. It eliminates guesswork by providing step-by-step instructions that any AI developer can follow, ensuring consistent results and reducing development time from weeks to days."
                  />
                  <FAQItem 
                      question="Which AI development tools work with these PRDs?"
                      answer="Our PRDs are designed to work with all major AI development platforms including Claude, ChatGPT, Cursor, Windsurf, Lovable, Bolt, V0, and any other AI tool that can interpret structured technical specifications."
                  />
                  <FAQItem 
                      question="Do I need any coding experience to use this?"
                      answer="Absolutely not! The PRD serves as a bridge between your vision and technical implementation. You simply copy and paste the provided prompts for each development phase. Think of yourself as the project manager rather than the developer."
                  />
                  <FAQItem 
                      question="How detailed are the technical specifications?"
                      answer="Very detailed. Each PRD includes database schemas, API endpoints, user interface wireframes, authentication flows, and integration specifications. The level of detail scales with the mode you choose - from basic architecture in Quick mode to enterprise-grade specifications in Enterprise mode."
                  />
              </div>
          </section>
        </main>

        <footer className="text-center py-16 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your App Idea Into Reality?</h3>
            <p className="text-lg text-gray-400 mb-8">Join thousands of creators who've successfully built their applications using our guided approach.</p>
            <a href="#start" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Choose Your Path Above ↑
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModeSelection;