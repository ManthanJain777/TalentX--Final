import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectChat = ({ messages, currentUser, onSendMessage }) => {
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && onSendMessage) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="glass-panel flex flex-col h-full max-h-[500px]">
      <div className="p-4 border-b border-ink/5 flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg text-ink">Project Chat</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isMe = msg.sender === currentUser;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-ink-faint">{msg.sender}</span>
                <span className="text-[9px] text-ink-faint/50">{msg.timestamp.split(' ')[1]}</span>
              </div>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  isMe 
                    ? 'bg-gradient-to-br from-gold to-gold-soft text-white rounded-tr-sm shadow-md shadow-gold/10' 
                    : 'bg-white/80 border border-ink/5 text-ink rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.message}
              </div>
            </motion.div>
          );
        })}
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-xs text-ink-faint font-mono">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-3 border-t border-ink/5 bg-white/30">
        <div className="flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-white/80 border border-cover/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold/30 transition-colors"
          />
          <button 
            onClick={handleSend}
            className="w-10 h-10 rounded-xl bg-gold text-white flex items-center justify-center hover:bg-gold-soft transition-colors shrink-0"
          >
            <Send className="w-4 h-4 -ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectChat;
