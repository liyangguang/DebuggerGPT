export interface Config {
  codeRoutepath: string;
  verbosity?: 'none'|'step-only'|'everything';
  maxIterations?: number;
}
