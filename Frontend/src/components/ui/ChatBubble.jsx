import React from 'react';

const ChatBubble = ({ text, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-md p-3 rounded-lg text-white ${isUser ?  "bg-blue-500": "bg-gray-500"  } relative text-wrap`}
      >
        {text}
        <div
          className={`absolute ${isUser ? 'right-0' : 'left-0'} bottom-0 w-0 h-0 border-8 border-transparent ${
            isUser ? 'border-blue-500 border-t-0 border-r-0' : 'border-gray-300 border-t-0 border-l-0'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ChatBubble;