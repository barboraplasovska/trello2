import { useState } from 'react';
import { useBoardStore } from '../../core/stores/BoardStore';
import { getBoardById, listUserBoards } from "../../core/services/BoardService";
import { createBoard, updateBoard, deleteBoard } from "../../core/services/BoardService";
import { BoardDto } from '../../core/models/BoardDto';

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
      const data: BoardDto = await getBoardById(id);
      setSelectedBoard(data);
      return data;
    } catch (error) {
      setError('Failed to load board details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      await createBoard(name);
      await loadBoards();
    } catch (error) {
      setError('Failed to create board');
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateBoard = async (boardId: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      await updateBoard(boardId, name);
      await loadBoards();
    } catch (error) {
      setError('Failed to update board');
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteBoard = async (boardId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBoard(boardId);
      await loadBoards();
    } catch (error) {
      setError('Failed to delete board');
    } finally {
      setLoading(false);
    }
  }

  return {
    boards,
    selectedBoard,
    loading,
    error,
    setError,
    userId,
    loadBoards,
    loadBoardById,
    handleCreateBoard,
    handleUpdateBoard,
    handleDeleteBoard,
  };
}
