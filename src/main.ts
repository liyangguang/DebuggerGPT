import dotenv from 'dotenv';

import { DebuggerGPT } from './lib/agent';
import type { Config } from './lib/types';

dotenv.config();

const config: Config = {
  codeRoutepath: process.env.CODE_ROOT_PATH || '/Users/liyangguang',
  verbosity: 'step-only',
  maxIterations: 3,
};

async function start() {
  const agent = new DebuggerGPT(config);
  const result = await agent.run(`What is the 1st line of ${config.codeRoutepath}/src/main.ts`);
  console.log(result);
}

start();
