import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createStructuredOutputRunnable } from "langchain/chains/openai_functions";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

const JSONSchema = {
  title: "Person",
  description: "Identifying information about a person.",
  type: "object",
  properties: {
    name: { title: "Name", description: "The person's name", type: "string" },
    age: { title: "Age", description: "The person's age", type: "integer" },
    fav_food: {
      title: "Fav Food",
      description: "The person's favorite food",
      type: "string"
    }
  },
  required: ["name", "age"]
};

const model = new ChatOpenAI();
const prompt = ChatPromptTemplate.fromMessages([
  ["human", "Human description: {description}"]
]);
const outputParser = new JsonOutputFunctionsParser();

const runnable = createStructuredOutputRunnable(
  JSONSchema,
  model,
  prompt,
  outputParser
);
const response = await runnable.invoke({
  description: "My name's John Doe and I'm 30 years old. My favorite kind of food are chocolate chip cookies."
});
console.log(response);
/**
{ name: 'John Doe', age: 30, fav_food: 'chocolate chip cookies' }
 */
