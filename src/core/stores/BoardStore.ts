import { create } from 'zustand';
import { Board } from '../models/Board';

interface BoardStore {
    boards: Board[];
    selectedBoard: Board | null;
    user: string | null;

    setBoards: (boards: Board[]) => void;
    setSelectedBoard: (board: Board) => void;
    setUser: (user: string) => void;
    clearUser: () => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
    boards: [],
    selectedBoard: null,
    user: localStorage.getItem('user') || null,

    setBoards: (boards) => set({ boards }),
    setSelectedBoard: (board) => set({ selectedBoard: board }),
    setUser: (user) => {
        localStorage.setItem('user', user);
        set({ user });
    },
    clearUser: () => {
        localStorage.removeItem('user');
        set({ user: null });
    }
}));
