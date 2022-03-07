const storage = {
  get(key) {
    const value = localStorage.get(key);
    if (!value) return null;
    return JSON.parse(value);
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};

export default storage;
