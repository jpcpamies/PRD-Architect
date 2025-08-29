
import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types';
import { SendIcon, EditIcon } from './icons';

// TypingIndicator component
const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5">
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
    </div>
);

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onEditMessage: (messageId: string, newText: string) => void;
  isGenerating: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, onEditMessage, isGenerating }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isGenerating) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const startEditing = (message: Message) => {
    setEditingMessageId(message.id);
    setEditingText(message.text);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditingText('');
  };

  const saveEditing = () => {
    if (editingMessageId && editingText.trim()) {
      onEditMessage(editingMessageId, editingText);
      cancelEditing();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'user' && (
              <button 
                onClick={() => editingMessageId === msg.id ? cancelEditing() : startEditing(msg)}
                className="p-1.5 text-gray-400 hover:text-white transition-colors"
                aria-label="Edit message"
              >
                <EditIcon className="w-4 h-4" />
              </button>
            )}
            <div className={`max-w-prose rounded-lg shadow ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
              {editingMessageId === msg.id ? (
                <div className="p-2">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full bg-indigo-700 border border-indigo-500 rounded-md p-2 resize-none focus:ring-2 focus:ring-indigo-400"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={cancelEditing} className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded-md text-xs font-semibold">Cancel</button>
                    <button onClick={saveEditing} className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded-md text-xs font-semibold">Save</button>
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap px-4 py-2">{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex justify-start">
            <div className="max-w-prose px-4 py-3 rounded-lg bg-gray-700 text-gray-200">
               <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isGenerating ? 'Assistant is thinking...' : 'Type your answer...'}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            rows={1}
            disabled={isGenerating || !!editingMessageId}
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={isGenerating || !inputValue.trim() || !!editingMessageId}
            className="p-3 bg-indigo-600 rounded-md text-white transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-6"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;