import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";
import "dotenv/config";
import axios from "axios";

const getWeatherTool = tool({
  name: "get_weather",
  description: "Use this tool to get the weather for a given city",
  parameters: z.object({
    city: z.string().describe("Name of the city"),
  }),
  execute: async function ({ city }) {
    const url = `https://wttr.in/${city.toLowerCase()}?format=j1`;
    return (await axios.get(url)).data;
  },
});

const agent = new Agent({
  name: "Weather Agent",
  instructions:
    "You are a weather agent that can get the weather for a given city",
  tools: [getWeatherTool],
});

const query = process.argv.slice(2).join(" ").trim();
const result = await run(agent, query);
console.log(result.finalOutput);
