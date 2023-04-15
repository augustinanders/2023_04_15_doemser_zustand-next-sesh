import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create a custom hook that uses Zustand and persists the state to local storage.
// Just use "create" instead of "createLocalStorageStore" for a non persisted store
export const useStore = createLocalStorageStore(
  (set) => ({
    count: 1,
    addCount: () => {
      set((state) => ({ count: state.count + 1 }));
    },
  }),
  "count"
);

// A function that returns a custom hook that can be used to access the state.
function createLocalStorageStore(initialStore, name) {
  // Create a Zustand store without persistence.
  const useServerStore = create(initialStore);
  // Create a Zustand store with persistence to local storage.
  const useClientStore = create(persist(initialStore, { name }));

  // A custom hook that selects the appropriate store based on whether
  // the component is hydrated or not.
  function useStore(selector, compare) {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      setHydrated(true);
    }, []);

    const clientStore = useClientStore(selector, compare);
    const serverStore = useServerStore(selector, compare);

    return hydrated ? clientStore : serverStore;
  }

  return useStore;
}
