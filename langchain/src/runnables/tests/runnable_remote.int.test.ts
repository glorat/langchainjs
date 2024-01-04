import { Operation, applyPatch } from "@langchain/core/utils/json_patch";
import { RemoteRunnable } from "../remote.js";

test("Invoke local langserve", async () => {
  const remote = new RemoteRunnable({
    url: `https://chat-langchain-backend.langchain.dev/chat`
  });
  const result = remote.streamLog({
    question: "What is this?"
  });
  let totalByteSize = 0;
  let aggregate: any = {};
  for await (const chunk of result) {
    const jsonString = JSON.stringify(chunk);
    aggregate = applyPatch(aggregate, chunk as Operation[]).newDocument;
    const byteSize = Buffer.byteLength(jsonString, "utf-8");
    totalByteSize += byteSize;
    console.log(chunk);
  }
  console.log("aggregate", aggregate);
  console.log("totalByteSize", totalByteSize);
});
