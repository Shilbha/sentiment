const express = require('express');
const axios = require('axios');
const Sentiment = require('sentiment');

const app = express();
const port = 5000;

const sentiment = new Sentiment();

app.use(express.json());
app.get('/positivenews', async (req, res) => {
    try {
        const newsApi = await axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=88d655364d984c3dbd9f7c1f411b154d');
        const newsData = newsApi.data.articles;
        const positiveNews = newsData.filter((article) => {
            const score = sentiment.analyze(article.title).score;
            return score > 0; // Change the filter condition to get positive news
        });
        console.log(positiveNews); // Log the positive news
        res.json(positiveNews); // Respond with positive news
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an error response
    }
});

app.listen(port, () => {
    console.log('Server is running...');
});
