import { run } from './agent';

(async function() {
  const result = await run(`What is the value of foo?`);
  console.log(result);
})();
