import { Router } from "express";

// /api/documents
const commentRouter = Router();

// /api/documents
commentRouter.get('/', async (req, res) => {
    await fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => response.json())
        .then((json) => res.json(json));
})

export default commentRouter;