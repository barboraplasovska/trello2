import { create } from 'zustand';

interface AuthStore {
    jwt: string | null;
    setJwt: (jwt: string) => void;
    clearJwt: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    jwt: null,
    setJwt: (jwt: string) => set({ jwt }),
    clearJwt: () => set({ jwt: null }),
}));

export default useAuthStore;
