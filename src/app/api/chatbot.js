import { Configuration, OpenAIAPi } from "openai";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        try {
            const { text } = req.body;

            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                prompt: text,
                maxTokens: 150,
                temperature: 0.7,
            });
            res.status(200).json({ response: response.data.choices[0].text });
        } catch (error) {
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}