import { Router, response } from "express";

// /api/comments
const commentRouter = Router();

// /api/comments
commentRouter.get('/', async (req, res) => {
    await fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => response.json())
        .then((json) => res.json(json));
})

// /api/comments/:id
commentRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
        .then((response) => response.json())
        .then((json) => res.json(json));
})

export default commentRouter;