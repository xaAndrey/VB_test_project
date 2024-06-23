import { BASE_URL } from "../../util/constants";

export const fetchAllComments = async (): Promise<Response> => {
    return await fetch(`${BASE_URL}/comments/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        // credentials: 'include',
    });
};

export const fetchCommentById = async (id: number): Promise<Response> => {
    return await fetch(`${BASE_URL}/comments/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        // credentials: 'include'
    });
}