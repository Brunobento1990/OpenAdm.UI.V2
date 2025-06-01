import CryptoJS from "crypto-js";

export function useLocalStorageApp() {
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY!;
  function getItem<T = unknown>(
    key: string,
    isObject?: boolean
  ): T | undefined {
    const valueLocalStorage = decrypt(localStorage.getItem(key));

    if (!valueLocalStorage) return undefined;

    if (isObject && valueLocalStorage) {
      return JSON.parse(valueLocalStorage) as T;
    }

    return valueLocalStorage as T;
  }

  function decrypt(ciphertext?: string | null): string {
    if (!ciphertext) return "";
    const bytes = CryptoJS.AES.decrypt(ciphertext, privateKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  function removeItem(key: string) {
    localStorage.removeItem(key);
  }

  function setItem(key: string, value: any, isObject?: boolean) {
    const newValue = isObject ? JSON.stringify(value) : value;
    const ciphertext = CryptoJS.AES.encrypt(newValue, privateKey).toString();
    localStorage.setItem(key, ciphertext);
  }

  return {
    getItem,
    setItem,
    removeItem,
  };
}
