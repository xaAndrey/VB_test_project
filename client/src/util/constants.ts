export const BASE_URL = "http://localhost:3000/api";

export const routes = {
    main: '/',
    document: '/comment/:id',
    goToDocumentPage: (id: number): string => `/comment/${id}`,
}