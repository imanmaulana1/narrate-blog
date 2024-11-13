import handleApiError from "@/lib/apiErrorHandler";
import { api } from "@/lib/axios";

export const getPosts = async () => {
    try {
        return await api.get('/posts');
    } catch (error) {
        const apiError = handleApiError(error);
        throw apiError;
    }
};