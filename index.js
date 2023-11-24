import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.json({
      message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
  });
  

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
  