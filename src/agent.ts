import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import dotenv from 'dotenv';

import { tools } from './tools';

dotenv.config();
const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });

export async function run(input: string): Promise<string> {
  console.info('===== Agent starting =====', input);
  const executor = await initializeAgentExecutorWithOptions(
    tools,
    model,
    {agentType: "zero-shot-react-description"}
  );

  const result = await executor.call({ input });

  console.info('===== Agent finished =====');
  return result.output;
}
