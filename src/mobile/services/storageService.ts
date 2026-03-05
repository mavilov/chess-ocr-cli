/**
 * storageService.ts — handles saving and retrieving the OpenAI API key from device storage.
 * Uses AsyncStorage for persistence.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY_STORAGE_KEY = "chess_ocr_openai_api_key";

/**
 * Retrieves the saved OpenAI API key from device storage.
 * @returns The API key string, or null if not set.
 */
export async function getApiKey(): Promise<string | null> {
  return AsyncStorage.getItem(API_KEY_STORAGE_KEY);
}

/**
 * Persists the OpenAI API key to device storage.
 * @param key - The API key to save.
 */
export async function setApiKey(key: string): Promise<void> {
  await AsyncStorage.setItem(API_KEY_STORAGE_KEY, key);
}

/**
 * Removes the stored API key from device storage.
 */
export async function clearApiKey(): Promise<void> {
  await AsyncStorage.removeItem(API_KEY_STORAGE_KEY);
}
