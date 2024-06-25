export const BASE_URL = "http://localhost:3000/api";

export const routes = {
    main: '/',
    comment: '/comment/:id',
    goToCommentPage: (id: number): string => `/comment/${id}`,
}