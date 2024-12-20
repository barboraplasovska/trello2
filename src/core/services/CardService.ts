import axios from "axios";
import {CardCreationForm} from "../models/CardCreationForm";
import {Card} from "../models/Card";
import {StatusObjectCard} from "../models/StatusObjectCard";

const KANBAN_API_URL = `/kanban-api/v1`;

export const updateCard = async (id: string, cardData: CardCreationForm): Promise<Card> => {
    try {
        const jwt = localStorage.getItem('accessToken');
        const response = await axios.put<Card>(`${KANBAN_API_URL}/cards/${id}`, cardData, {
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
        const jwt = localStorage.getItem('accessToken');
        const response = await axios.put<Card>(`${KANBAN_API_URL}/cards/${id}/move-to/${newColumnId}`, cardData, {
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
        const jwt = localStorage.getItem('accessToken');
        const response = await axios.post<StatusObjectCard>(`${KANBAN_API_URL}/cards/${id}/delete`, cardData, {
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
        const jwt = localStorage.getItem('accessToken');
        const response = await axios.post<Card>(`${KANBAN_API_URL}/cards/`, cardData, {
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