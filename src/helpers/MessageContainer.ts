export type Message = {
    id: number;
    content: string;
    removing?: boolean;
};

type MessageHandler = (messages: Message[]) => void; // 订阅者

class MessageContainer {
    private static instance: MessageContainer; // 单例模式
    private handlers: MessageHandler[] = []; // 消息处理（有新消息时需要通知的回调函数）
    private messages: Message[] = []; // 消息列表
    private messageId = 0;

    private constructor() { }

    public static getInstance(): MessageContainer {
        if (!MessageContainer.instance) {
            MessageContainer.instance = new MessageContainer();
        }
        return MessageContainer.instance;
    }

    public subscribe(handler: MessageHandler) {
        this.handlers.push(handler);
        handler(this.messages);
    }

    public unsubscribe(handler: MessageHandler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }

    public info(content: string) {
        const message = { id: this.messageId++, content };
        this.messages.push(message);
        this.handlers.forEach(handler => handler(this.messages));
        setTimeout(() => this.startRemovingMessage(message.id), 3000);
    }

    private removeMessage(id: number) {
        this.messages = this.messages.filter(message => message.id !== id);
        this.handlers.forEach(handler => handler(this.messages));
    }

    public startRemovingMessage(id: number) {
        this.messages = this.messages.map(message =>
            message.id === id ? { ...message, removing: true } : message
        );
        this.handlers.forEach(handler => handler(this.messages));
        // 延迟删除，以便触发 CSS 动画
        setTimeout(() => this.removeMessage(id), 500);
    }
}

export const messageContainer = MessageContainer.getInstance();  