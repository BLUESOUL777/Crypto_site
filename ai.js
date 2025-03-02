require('dotenv').config();
const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function chatWithGPT(prompt) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4', // or 'gpt-3.5-turbo'
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 200,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("AI:", response.data.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}