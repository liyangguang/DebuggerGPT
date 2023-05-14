import { DynamicTool } from "langchain/tools";

export const tools = [
  new DynamicTool({
    name: "FOO",
    description:
      "call this to get the value of foo. input should be an empty string.",
    func: () => Promise.resolve("baz"),
  }),
  new DynamicTool({
    name: "BAR",
    description:
      "call this to get the value of bar. input should be an empty string.",
    func: () => Promise.resolve("baz1"),
  }),
];
