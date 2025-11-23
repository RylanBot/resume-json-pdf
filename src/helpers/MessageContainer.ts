interface MessageOptions {
  id?: string;
  duration?: number; // ms, 小于等于 0 视为永久
}

class MessageContainer {
  private readonly identifier = "message-container";
  private readonly delay = 5000;

  private static instance: MessageContainer;
  private container: HTMLDivElement | null = null;

  // id → timer / element
  private timers = new Map<string, number>();
  private elements = new Map<string, HTMLDivElement>();

  private constructor() {
    this.initContainer();
  }

  private initContainer() {
    if (typeof document !== "undefined") {
      const existing = document.querySelector(
        `.${this.identifier}`
      ) as HTMLDivElement;
      if (existing) {
        this.container = existing;
        return;
      }

      this.container = document.createElement("div");
      this.container.className = this.identifier;
      document.body.appendChild(this.container);
    }
  }

  public static getInstance(): MessageContainer {
    if (!MessageContainer.instance) {
      MessageContainer.instance = new MessageContainer();
    }
    return MessageContainer.instance;
  }

  public info(content: string, opts: MessageOptions = {}) {
    if (!this.container) {
      return;
    }

    const id = opts.id ?? `msg_${Date.now()}_${Math.random()}`;
    const duration = opts.duration ?? this.delay;

    // 如果已存在 → 重置 timer
    if (this.elements.has(id)) {
      const oldTimer = this.timers.get(id);
      if (oldTimer) clearTimeout(oldTimer);

      if (duration > 0) {
        this.autoRemove(id, duration);
      }
      return id;
    }

    // 创建消息
    const el = document.createElement("div");
    el.className = "message-item slide-in-right";

    const icon = document.createElement("i");
    icon.className =
      "flex items-center mx-1 text-lg text-red-900 mr-4 fa-solid fa-triangle-exclamation";

    const text = document.createElement("span");
    text.textContent = content;

    el.appendChild(icon);
    el.appendChild(text);

    this.container.appendChild(el);
    this.elements.set(id, el);

    if (duration > 0) {
      this.autoRemove(id, duration);
    }

    return id;
  }

  private autoRemove(id: string, duration?: number) {
    const delay = duration ?? this.delay;

    const timer = window.setTimeout(() => {
      this.remove(id);
    }, delay);

    this.timers.set(id, timer);
  }

  public remove(id: string) {
    const el = this.elements.get(id);
    if (!el) return;

    const timer = this.timers.get(id);
    if (timer) clearTimeout(timer);

    el.classList.add("fading-out");

    setTimeout(() => {
      el.remove();
      this.elements.delete(id);
      this.timers.delete(id);
      if (this.elements.size === 0) {
        this.destroy();
      }
    }, 500);
  }

  public destroy() {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }

    for (const t of this.timers.values()) clearTimeout(t);
    this.timers.clear();
    this.elements.clear();
  }
}

export const messageContainer = MessageContainer.getInstance();
