import { Router } from "express";

// /api/documents
const documentRouter = Router();

// /api/documents
documentRouter.get('/', async (req, res) => {
    await fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => response.json())
        .then((json) => res.json(json));
})

export default documentRouter;