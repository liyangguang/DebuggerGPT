import { OpenAI } from "langchain/llms/openai";
import { AgentExecutor, initializeAgentExecutorWithOptions } from "langchain/agents";
import dotenv from 'dotenv';

import { FileReaderTool } from './tools';
import type { Config } from './types';

const DEFAULT_MAX_ITERATIONS = 10;

dotenv.config();
const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });

export class DebuggerGPT {
  private codeRootPath: string = '';
  private executorPromise: Promise<AgentExecutor>;

  constructor(config: Config) {
    this.codeRootPath = config.codeRoutepath;
    this.executorPromise = initializeAgentExecutorWithOptions(
      [new FileReaderTool(this.codeRootPath)],
      model,
      {
        agentType: "zero-shot-react-description",
        returnIntermediateSteps: ['step-only', 'everything'].includes(config.verbosity!),
        verbose: config.verbosity === 'everything',
        maxIterations: config.maxIterations || DEFAULT_MAX_ITERATIONS,
      },
    );
    this.executorPromise.then(() => {
      console.info('[DebuggerGPT] Agent ready!');
    });
  }

  async run(input: string): Promise<string> {
    console.info('[DebuggerGPT] Agent starts to work on:', input);

    const executor = await this.executorPromise;
    const result = await executor.call({ input });
  
    console.info('[DebuggerGPT] Agent finished!');
    return result.output;
  }  
}
