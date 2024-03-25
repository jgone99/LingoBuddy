const OpenAI = require('openai');
require('dotenv').config();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const assistantId = 'asst_2a7c7ypslY4X5X7zCnr2vTp9';

async function createThreadAndRun(userMessage) {
  try {
    // Create a new thread
    const thread = await openai.beta.threads.create();

    // Create a user message in the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: userMessage,
    });

    // Run the assistant on the thread
    let run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    // Wait for the run to complete
    while (run.status !== 'completed') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Retrieve the assistant's response from the thread
    const threadMessages = await openai.beta.threads.messages.list(thread.id);
    const assistantResponse = threadMessages.data
      .filter((message) => message.role === 'assistant')
      .map((message) => message.content[0].text.value)
      .join('\n');

    return assistantResponse;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const { userMessage } = await request.json();
    const assistantResponse = await createThreadAndRun(userMessage);

    return new Response(JSON.stringify({ response: assistantResponse }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response('Internal server error.', { status: 500 });
  }
}