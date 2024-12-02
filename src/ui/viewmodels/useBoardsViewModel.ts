import { useState } from 'react';
import { useBoardStore } from '../../core/stores/BoardStore';
import {getBoardById, listUserBoards} from "../../core/services/BoardService";

export function useBoardsViewModel() {
  const { boards, selectedBoard, userId, setBoards, setSelectedBoard } = useBoardStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBoards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listUserBoards();
      setBoards(data);
    } catch (error) {
      setError('Failed to load boards');
    } finally {
      setLoading(false);
    }
  };

  const loadBoardById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBoardById(id);
      setSelectedBoard(data.board);
    } catch (error) {
      setError('Failed to load board details');
    } finally {
      setLoading(false);
    }
  };

  return {
    boards,
    selectedBoard,
    loading,
    error,
    userId,
    loadBoards,
    loadBoardById,
  };
}
