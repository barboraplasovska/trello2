import axios from "axios";
import {LoginRequest} from "../models/LoginRequest";
import {User} from "../models/User";
import {JwtResponse} from "../models/JwtResponse";
import useAuthStore from "../stores/userStore";

const apiUrl = process.env.REACT_APP_KANBAN_API_URI;
const API_BASE_URL = `${apiUrl}/kanban-api/v1`;

export const register = async (loginRequest: LoginRequest): Promise<User> => {
    try {
        const response = await axios.post<User>(`${API_BASE_URL}/register`, loginRequest, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
        });
        console.log('User registered successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (loginRequest: LoginRequest): Promise<JwtResponse> => {
    try {
        const response = await axios.post<JwtResponse>(`${API_BASE_URL}/login`, loginRequest, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
        });
        console.log('User logged in successfully:', response.data);

        const jwt_token = response.data.jwt;
        useAuthStore.getState().setJwt(jwt_token);

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};