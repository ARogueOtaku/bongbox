import express from "express";
import { VerifyDiscordRequest } from "./utils";
import { InteractionResponseType, InteractionType } from "discord-interactions";

const app = express();

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post("/interactions", async (req, res) => {
  const { type, id, data } = req.body;
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Bot Started!");
});
