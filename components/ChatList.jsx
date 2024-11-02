"use client"
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ChatList = ({ messages, inputMessage, isLoading, handleSendMessage, handleInputChange, handleKeyPress }) => {
  const chatEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <motion.div
      className="flex flex-col h-[90vh] md:h-96 relative bg-[hsl(var(--background))]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Chat Window */}
      <motion.div
        className="flex-1 border border-[hsl(var(--border))] rounded-lg h-[75vh] w-full shadow-lg dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] bg-[hsl(var(--card))] absolute bottom-20 md:bottom-16 overflow-hidden md:h-80 md:w-[30rem]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Chat Message List */}
        <div
          ref={messageContainerRef}
          className="overflow-y-auto h-full p-4 scrollbar-thin scrollbar-thumb-[hsl(var(--primary))] scrollbar-track-[hsl(var(--secondary))]"
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`chat-message mb-2 p-2 rounded-lg ${
                msg.sender === 'You'
                  ? 'bg-[hsl(var(--chart-1))] text-[hsl(var(--primary))] self-end'
                  : 'bg-[hsl(var(--accent))] text-[hsl(var(--primary))] self-start'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <strong>{msg.sender}: </strong> {msg.message}
            </motion.div>
          ))}
          {/* Scroll to this div when a new message is sent */}
          <div ref={chatEndRef} />
        </div>
      </motion.div>

      {/* Input Section */}
      <motion.div
        className="flex items-center h-fit p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] absolute bottom-0 w-full md:w-[30rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
      >
        <motion.input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={isLoading ? 'Wait, I am thinking...' : 'Type your message...'}
          className="flex-1 p-2 rounded-lg focus:outline-none text-white focus:ring-2 focus:ring-[hsl(var(--chart-3))] bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--primary-foreground))] placeholder-[hsl(var(--muted-foreground))]"
          disabled={isLoading}
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-[hsl(var(--chart-1))] rounded-lg text-white hover:bg-[hsl(var(--chart-2))] disabled:bg-gray-400"
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ChatList;
