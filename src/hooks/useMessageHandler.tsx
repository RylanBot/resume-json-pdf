import { useEffect, useState } from 'react';
import { Message, messageContainer } from '@/helpers/MessageContainer';
import { LuAlertTriangle } from 'react-icons/lu';

export function useMessageHandler() {
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

  const contextHolder = (
    <div className="fixed top-16 right-0 p-4 w-64">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-center bg-white border border-gray-400 rounded-lg shadow-sm p-3 mb-2 text-gray-800 text-sm font-semibold slide-in-right ${message.removing ? 'fading-out' : ''}`}
        >
          <LuAlertTriangle className="w-5 h-5 text-red-900 mr-4" />
          {message.content}
        </div>
      ))}
    </div>
  );

  return { contextHolder };
}
