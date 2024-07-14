const express = require('express');
const bodyParser = require('body-parser');
const { ChatOpenAI } = require('@langchain/openai');
// import { ChatOpenAI } from "@langchain/openai";
// import { HumanMessage } from "@langchain/core/messages";
const { ChatPromptTemplate } = require('langchain_core.prompts');
// from langchain_core.prompts import ChatPromptTemplate
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const llm = new ChatOpenAI();
const prompt = ChatPromptTemplate.fromTemplate(`Translate the next text from Dutch to English and only output the translated text:\n\n{input}`);
const chain = prompt | llm;
const client = new OpenAI();
const speechFilePath = path.join(__dirname, 'speech1.mp3');

app.post('/api/translate', async (req, res) => {
    try {
        const result = await chain.invoke({ input: req.body.input });
        res.json({ translatedText: result.content });
    } catch (error) {
        console.error('Error during translation:', error);
        res.status(500).send('Translation error');
    }
});

app.post('/api/speech', async (req, res) => {
    try {
        const speechResponse = await client.audio.speech.create({
            model: 'tts-1',
            voice: 'alloy',
            speed: 0.7,
            input: req.body.text,
        });

        fs.writeFileSync(speechFilePath, speechResponse.content);
        res.sendFile(speechFilePath);
    } catch (error) {
        console.error('Error generating speech:', error);
        res.status(500).send('Speech generation error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
