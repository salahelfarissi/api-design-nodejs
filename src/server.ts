import express from 'express';

const app = express();

app.get('/', (req, res) => {
    console.log('GET /');
    res.status(200)
    res.json({ message: 'Hello World!' })
    res.end();
})

export default app;