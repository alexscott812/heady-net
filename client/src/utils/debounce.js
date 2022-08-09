const debounce = (callback, timeout = 100) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };
}

export default debounce;
