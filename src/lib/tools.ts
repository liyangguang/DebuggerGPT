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
          if (!path.includes(codeRootPath)) throw new Error(`You do not have access to this file. Give up on trying to read this file.`)
          return fs.readFileSync(path, 'utf8');
        } catch (e) {
          return `Cannot read the file. Error: ${(e as Error).message}`;
        }
      }
    });
  }
}
