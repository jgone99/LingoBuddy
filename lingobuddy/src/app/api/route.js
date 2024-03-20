const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "your_openai_api_key_here",
});
const openai = new OpenAIApi(configuration);

async function handleInput(inputText) {
  try {
    const detection = await openai.createClassification({
      model: "text-davinci-003",
      query: inputText,
      examples: [
        ["¿Cómo estás?", "Spanish"],
        ["How are you?", "English"],
        // Add more examples as needed to improve language detection
      ],
    });

    if (detection.data.label === "Spanish") {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: inputText,
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      return response.data.choices[0].text.trim();
    } else {
      return `Please, let's continue our conversation in Spanish. / Por favor, continuemos nuestra conversación en español.`;
    }
  } catch (error) {
    console.error("Error handling input:", error);
    return "I encountered an error. Please try again.";
  }
}

const userInput = "How are you?";
handleInput(userInput).then((response) => {
  console.log(response);
});
