import { set, get } from 'idb-keyval';

// Adapted from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey
export async function deriveKey(password, salt) {
  const encoder = new TextEncoder();

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  await set("cryptoKey", key); // Store the derived key in IndexedDB
  
  return key;
}

export async function getKey() {
  const key = await get("cryptoKey");

  if (!key) {
    console.log("No crypto key found in IndexedDB.");
    return null;
  }

  return key;
}

// Adapted from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
export async function encryptContent(plainText, key) {
  const encoder = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(plainText)
  );

  return {
    // Convert the IV and encryptedContent to base64 strings for storage
    iv: btoa(String.fromCharCode(...iv)),
    content: btoa(String.fromCharCode(...new Uint8Array(encryptedContent)))
  };
}

// Adapted from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
export async function decryptContent(encryptedContent, iv, key) {
  const decoder = new TextDecoder();

  // Convert base64 strings back to Uint8Array for decryption
  const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
  const encryptedBytes = Uint8Array.from(atob(encryptedContent), c => c.charCodeAt(0));
  
  const decryptedContent = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    key,
    encryptedBytes
  );

  return decoder.decode(decryptedContent);
}