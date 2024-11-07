import axios from "axios";
import {Board} from "../models/Board";
import {BoardDto} from "../models/BoardDto";
import {StatusObjectBoard} from "../models/StatusObjectBoard";
import useAuthStore from "../stores/userStore";

const apiUrl = process.env.REACT_APP_KANBAN_API_URI;
const API_BASE_URL = `${apiUrl}/kanban-api/v1`;
const jwt = useAuthStore((state) => state.jwt);

export const updateBoard = async (id: string, name: string): Promise<Board> => {
    try {
        const response = await axios.put<Board>(`${API_BASE_URL}/boards/${id}/${name}`, null, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Board updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating board:', error);
        throw error;
    }
};

export const createBoard = async (name: string): Promise<Board> => {
    try {
        const response = await axios.post<Board>(`${API_BASE_URL}/boards/${name}`, null, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Board created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating board:', error);
        throw error;
    }
};

export const getBoardById = async (id: string): Promise<BoardDto> => {
    try {
        const response = await axios.get<BoardDto>(`${API_BASE_URL}/boards/${id}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Board details retrieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching board details:', error);
        throw error;
    }
};

export const deleteBoard = async (id: string): Promise<StatusObjectBoard> => {
    try {
        const response = await axios.delete<StatusObjectBoard>(`${API_BASE_URL}/boards/${id}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Board deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting board:', error);
        throw error;
    }
};

export const listUserBoards = async (): Promise<Board[]> => {
    try {
        const response = await axios.get<Board[]>(`${API_BASE_URL}/boards/`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Boards listed successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error listing boards:', error);
        throw error;
    }
};