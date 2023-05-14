import { DynamicTool } from "langchain/tools";
import * as fs from 'fs';

export class FileReaderTool extends DynamicTool {
  constructor(codeRootPath: string) {
    super({
      name: "File reader",
      description:
        "input a path to a file, outputs the content of the file.",
      async func(path: string) {
        try {
          // TODO: handle relative path
          if (!path.includes(codeRootPath)) throw new Error(`This file is outside of the code root. You don't have access to it.`)
          return fs.readFileSync(path, 'utf8');
        } catch (e) {
          return `Cannot read the file. Error: ${(e as Error).message}`;
        }
      }
    });
  }
}
