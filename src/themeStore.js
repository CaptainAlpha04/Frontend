// themeStore.js
import { writable } from 'svelte/store';

// Initialize the store with the value from localStorage
export const darkTheme = writable(localStorage.getItem('darkTheme') === 'true');