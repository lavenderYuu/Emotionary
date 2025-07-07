let store = {};

export async function set(key, value) {
  store[key] = value;
}

export async function get(key) {
  return store[key] || null;
}

export async function clear() {
  store = {};
}