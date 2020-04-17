class TitleWatcher {

  private listeners: ((title: string) => void)[] = [];
  private observer: MutationObserver;

  constructor() {
    if (!document.querySelector('title')) {
      setInterval(() => this.setup(), 0)
      return
    } else {
      this.setup()
    }
  }
  
  private setup() {
    this.observer = new MutationObserver(() => this.updateTitle());
    this.observer.observe(document.querySelector('title'), { subtree: true, characterData: true, childList: true });
  }

  public addListener(listener: (title: string) => void) {
    this.listeners.push(listener)
  }

  public destroy() {
    this.observer.disconnect()
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