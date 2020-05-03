class TitleWatcher {

  private listeners: ((title: string | undefined) => void)[] = [];
  private observer?: MutationObserver;

  constructor() {
    if (!document.querySelector('title')) {
      setTimeout(() => this.setup(), 0)
      return
    } else {
      this.setup()
    }
  }
  
  private setup() {
    this.observer = new MutationObserver(() => this.updateTitle());
    
    const titleEl = document.querySelector('title')
    if (titleEl) {
      this.observer.observe(titleEl, { subtree: true, characterData: true, childList: true });
    }
  }

  public addListener(listener: (title: string | undefined) => void) {
    this.listeners.push(listener)
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  updateTitle() {
    const data = this.getTitle()
    for (const listener of this.listeners) {
      listener(data)
    }
  }

  getTitle() {
    const titleElement = document.querySelector('title')
    return titleElement?.innerText
  }

}

export default TitleWatcher