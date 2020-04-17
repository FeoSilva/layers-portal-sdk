import debounce from "./debounce"

class LocationWatcher {

  private listeners: ((location: string) => void)[] = [];

  constructor() {
    const locationChangeCallback = debounce(() => {
      this.updateLocation();
    }, 0);

    // Monkey patch history functions
    this.monkeyPatchHistory()

    window.addEventListener("locationchange", locationChangeCallback, false);
    window.addEventListener("hashchange", locationChangeCallback, false);
    window.addEventListener("popstate", locationChangeCallback, false);
    window.addEventListener("pushState", locationChangeCallback, false);
    window.addEventListener("replaceState", locationChangeCallback, false);
  }

  public addListener(listener: (location: string) => void) {
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

  updateLocation() {
    const data = this.getLocation()
    for (const listener of this.listeners) {
      listener(data)
    }
  }

  getLocation() {
    return window.location.href
  }

}

export default LocationWatcher