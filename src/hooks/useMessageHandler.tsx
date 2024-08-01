import { useEffect, useState } from 'react';

import { LuAlertTriangle } from 'react-icons/lu';

import { Message, messageContainer } from '@/helpers/MessageContainer';

function useMessageHandler() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handleMessage = (newMessages: Message[]) => {
      setMessages([...newMessages]);
    };

    messageContainer.subscribe(handleMessage);
    return () => {
      messageContainer.unsubscribe(handleMessage);
    };
  }, []);

  const messageContext = messages.length > 0 && (
    <div className="fixed z-50 top-16 max-sm:top-32 right-0 p-4 w-64">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-center bg-white border border-gray-400 rounded-lg shadow-sm p-3 max-sm:p-2 mb-2 text-gray-800 text-sm max-sm:text-xs font-semibold slide-in-right ${message.removing ? 'fading-out' : ''}`}
        >
          <LuAlertTriangle className="w-5 h-5 text-red-900 mr-4" />
          {message.content}
        </div>
      ))}
    </div>
  );

  return { messageContext };
}

export default useMessageHandler;