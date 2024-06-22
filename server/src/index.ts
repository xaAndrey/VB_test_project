import express from 'express';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(port, () => {
    console.log(
        '\x1b[36m%s\x1b[0m',
        `Server is running at http://localhost:${port}`
    );
})