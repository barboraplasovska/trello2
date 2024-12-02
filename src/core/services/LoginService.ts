import axios from "axios";
import {LoginRequest} from "../models/LoginRequest";
import {User} from "../models/User";
import {JwtResponse} from "../models/JwtResponse";
import useAuthStore from "../stores/userStore";

const KANBAN_API_URL = `/kanban-api/v1`;

export const register = async (loginRequest: LoginRequest): Promise<User> => {
    try {
        const response = await axios.post<User>(`${KANBAN_API_URL}/register`, loginRequest, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
        });
        console.log('User registered successfully:', response.data);
        localStorage.setItem('userId', response.data.id);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (loginRequest: LoginRequest): Promise<JwtResponse> => {
    try {
        const response = await axios.post<JwtResponse>(`${KANBAN_API_URL}/login`, loginRequest, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
        });
        console.log('User logged in successfully:', response.data);

        const jwt_token = response.data.jwt;
        localStorage.setItem('accessToken', jwt_token);
        localStorage.setItem('userId', response.data.user.id);
        useAuthStore.getState().login()

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        useAuthStore.getState().logout()
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}