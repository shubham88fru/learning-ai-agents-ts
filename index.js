import { Agent, run } from "@openai/agents";
import "dotenv/config";

const helloAgent = new Agent({
  name: "Hello Agent",
  instructions:
    "You are an agent that greets user in the language they specify",
  tools: [],
  modelSettings: {
    temperature: 1,
  },
});

const language = process.argv.slice(2).join(" ").trim();
const result = await run(helloAgent, language);
console.log(result.finalOutput);
