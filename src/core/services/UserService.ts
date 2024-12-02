import axios from "axios";
import {User} from "../models/User";

const KANBAN_API_URL = `/kanban-api/v1`;

export const getUsers = async (): Promise<User[]> => {
    try {
        const jwt = localStorage.getItem('accessToken');
        const response = await axios.get<User[]>(`${KANBAN_API_URL}/users`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Users retrieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    }
};