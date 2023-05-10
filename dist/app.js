"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const discord_interactions_1 = require("discord-interactions");
const commands_1 = __importDefault(require("./commands"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ verify: (0, utils_1.VerifyDiscordRequest)(process.env.PUBLIC_KEY) }));
app.post("/interactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received", req);
    const { type, id, data } = req.body;
    if (type === discord_interactions_1.InteractionType.PING) {
        return res.send({ type: discord_interactions_1.InteractionResponseType.PONG });
    }
    if (type === discord_interactions_1.InteractionType.APPLICATION_COMMAND) {
        const { name } = data;
        return res.send({
            type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Received: " + name,
            },
        });
    }
}));
(0, utils_1.InstallGlobalCommands)(process.env.APP_ID, commands_1.default);
app.listen(process.env.PORT, () => {
    console.log("Bot Started!");
});
