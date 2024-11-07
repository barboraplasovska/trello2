import axios from "axios";
import {User} from "../models/User";
import useAuthStore from "../stores/userStore";

const apiUrl = process.env.REACT_APP_KANBAN_API_URI;
const API_BASE_URL = `${apiUrl}/kanban-api/v1`;
const jwt = useAuthStore((state) => state.jwt);

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${API_BASE_URL}/users`, {
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