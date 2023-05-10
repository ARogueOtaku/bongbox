import express from "express";
import { InstallGlobalCommands, VerifyDiscordRequest } from "./utils";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import ALL_COMMANDS from "./commands";

const app = express();

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post("/interactions", async (req, res) => {
  console.log("Received", req);
  const { type, id, data } = req.body;
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Received: " + name,
      },
    });
  }
});

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);

app.listen(process.env.PORT, () => {
  console.log("Bot Started!");
});
