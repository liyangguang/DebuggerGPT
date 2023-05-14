# DebuggerGPT

An LLM that debugs code like a human being.
It reads the error message and source, and look for the file to find out how to fix errors.

## How to use

1. `npm ci`.
1. `cp .env.template .env`. Then fill in the values in `.env`.
1. Update content in `/src/main.ts` as needed.
1. `npm start`.

## TODOs

- file traversal tool
  - set a root
- browsing tool (is it needed?)
- support source map
- error reading chrome extension
  - activetab?
- propose/update code
