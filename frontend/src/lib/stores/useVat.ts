import { writable } from 'svelte/store';

const STORAGE_KEY = 'vat-enabled';

function createVatStore() {
    // Get initial value from localStorage, handle SSR
    const storedState = typeof window !== 'undefined' 
        ? JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'false')
        : false;

    const { subscribe, set } = writable(storedState);

    return {
        subscribe,
        set: (value: boolean) => {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
            }
            set(value);
        }
    };
}

export const useVat = createVatStore();