import express from 'express';
import commentRouter from './routes/commentRouter';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.all('*', function (req, res, next) {
    res.header ("Access-Control-Allow-Origin", req.headers.origin); // Переход от исходного * к источнику текущего запроса
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header ("Access-Control-Allow-Credentials", 'true'); // Разрешить отправку файлов cookie
    next();
});


app.use('/api/comments', commentRouter);

app.listen(port, () => {
    console.log(
        '\x1b[36m%s\x1b[0m',
        `Server is running at http://localhost:${port}`
    );
})