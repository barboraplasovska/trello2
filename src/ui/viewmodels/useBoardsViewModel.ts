import { useState } from 'react';
import { useBoardStore } from '../../core/stores/BoardStore';

export function useBoardsViewModel() {
  const { boards, selectedBoard, setBoards, setSelectedBoard } = useBoardStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBoards = async () => {
    setLoading(true);
    setError(null);
    // try {
    //   const data = await fetchBoards();
    //   setBoards(data);
    // } catch (error) {
    //   setError('Failed to load boards');
    // } finally {
    //   setLoading(false);
    // }
  };

  const loadBoardById = async (id: string) => {
    setLoading(true);
    setError(null);
    // try {
    //   const data = await fetchBoardById(id);
    //   setSelectedBoard(data);
    // } catch (error) {
    //   setError('Failed to load board details');
    // } finally {
    //   setLoading(false);
    // }
  };

  return {
    boards,
    selectedBoard,
    loading,
    error,
    loadBoards,
    loadBoardById,
  };
}
