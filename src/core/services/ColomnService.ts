import axios from "axios";
import {Column} from "../models/Column";
import {StatusObjectColumn} from "../models/StatusObjectColumn";
import useAuthStore from "../stores/userStore";

const apiUrl = process.env.REACT_APP_KANBAN_API_URI;
const API_BASE_URL = `${apiUrl}/kanban-api/v1`;
const jwt = useAuthStore((state) => state.jwt);

export const updateColumn = async (columnData: Column): Promise<void> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/columns/`, columnData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Column updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating column:', error);
        throw error;
    }
};

export const createColumn = async (boardId: string, name: string): Promise<Column> => {
    try {
        const response = await axios.post<Column>(`${API_BASE_URL}/columns/board/${boardId}/name/${name}`, null, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Column created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating column:', error);
        throw error;
    }
};

export const getColumnsByBoardId = async (boardId: string): Promise<Column[]> => {
    try {
        const response = await axios.get<Column[]>(`${API_BASE_URL}/columns/board/${boardId}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Columns fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching columns:', error);
        throw error;
    }
};

export const deleteColumn = async (columnId: string): Promise<StatusObjectColumn> => {
    try {
        const response = await axios.delete<StatusObjectColumn>(`${API_BASE_URL}/columns/${columnId}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Column deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting column:', error);
        throw error;
    }
};