import debounce from "./debounce"

type HistoryListener = ({ url: string, state: any }) => any

class HistoryWatcher {

  private listeners: HistoryListener[] = [];

  constructor() {
    const locationChangeCallback = debounce(() => {
      this.updateHistory();
    }, 0);

    // Monkey patch history functions
    this.monkeyPatchHistory()

    window.addEventListener("locationchange", locationChangeCallback, false);
    window.addEventListener("hashchange", locationChangeCallback, false);
    window.addEventListener("popstate", locationChangeCallback, false);
    window.addEventListener("pushState", locationChangeCallback, false);
    window.addEventListener("replaceState", locationChangeCallback, false);
  }

  public addListener(listener: HistoryListener) {
    this.listeners.push(listener)
  }

  public destroy() {
    // TODO
  }

  private monkeyPatchHistory() {
    const _wr = function (type) {
      const orig = history[type];
      return function () {
        const rv = orig.apply(this, arguments);
        const e = new Event(type);
        (<any>e).arguments = arguments;
        window.dispatchEvent(e);
        return rv;
      };
    };
    history.pushState = _wr("pushState");
    history.replaceState = _wr("replaceState");
  }

  updateHistory() {
    const url = window.location.href
    const state = window?.history?.state

    for (const listener of this.listeners) {
      listener({ url, state })
    }
  }

}

export default HistoryWatcher