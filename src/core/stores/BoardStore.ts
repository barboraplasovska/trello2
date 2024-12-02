import { create } from 'zustand';
import { Board } from '../models/Board';

interface BoardStore {
    boards: Board[];
    selectedBoard: Board | null;
    userId: string | null;

    setBoards: (boards: Board[]) => void;
    setSelectedBoard: (board: Board) => void;
    setUser: (user: string) => void;
    clearUser: () => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
    boards: [],
    selectedBoard: null,
    userId: localStorage.getItem('userId') || null,

    setBoards: (boards) => set({ boards }),
    setSelectedBoard: (board) => set({ selectedBoard: board }),
    setUser: (userId) => {
        localStorage.setItem('userId', userId);
        set({ userId });
    },
    clearUser: () => {
        localStorage.removeItem('user');
        set({ userId: null });
    }
}));
