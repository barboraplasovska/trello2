import axios from "axios";
import {CardCreationForm} from "../models/CardCreationForm";
import {Card} from "../models/Card";
import {StatusObjectCard} from "../models/StatusObjectCard";
import useAuthStore from "../stores/userStore";

const apiUrl = process.env.REACT_APP_KANBAN_API_URI;
const API_BASE_URL = `${apiUrl}/kanban-api/v1`;
const jwt = useAuthStore((state) => state.jwt);

export const updateCard = async (id: string, cardData: CardCreationForm): Promise<Card> => {
    try {
        const response = await axios.put<Card>(`${API_BASE_URL}/cards/${id}`, cardData, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Card updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating card:', error);
        throw error;
    }
};

export const moveCardToColumn = async (id: string, newColumnId: string, cardData: CardCreationForm): Promise<Card> => {
    try {
        const response = await axios.put<Card>(`${API_BASE_URL}/cards/${id}/move-to/${newColumnId}`, cardData, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Card moved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error moving card:', error);
        throw error;
    }
};

export const deleteCard = async (id: string, cardData: CardCreationForm): Promise<StatusObjectCard> => {
    try {
        const response = await axios.post<StatusObjectCard>(`${API_BASE_URL}/cards/${id}/delete`, cardData, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Card deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting card:', error);
        throw error;
    }
};

export const createCard = async (cardData: CardCreationForm): Promise<Card> => {
    try {
        const response = await axios.post<Card>(`${API_BASE_URL}/cards/`, cardData, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('Card created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating card:', error);
        throw error;
    }
};