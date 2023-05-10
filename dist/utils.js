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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallGlobalCommands = exports.DiscordRequest = exports.VerifyDiscordRequest = void 0;
const discord_interactions_1 = require("discord-interactions");
function VerifyDiscordRequest(clientKey) {
    return function (req, res, buf) {
        var _a, _b;
        const signature = (_a = req.get("X-Signature-Ed25519")) !== null && _a !== void 0 ? _a : "";
        const timestamp = (_b = req.get("X-Signature-Timestamp")) !== null && _b !== void 0 ? _b : "";
        const isValidRequest = (0, discord_interactions_1.verifyKey)(buf, signature, timestamp, clientKey);
        if (!isValidRequest) {
            res.status(401).send("Bad request signature");
            throw new Error("Bad request signature");
        }
    };
}
exports.VerifyDiscordRequest = VerifyDiscordRequest;
function DiscordRequest(endpoint, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://discord.com/api/v10/" + endpoint;
        if (options.body)
            options.body = JSON.stringify(options.body);
        const res = yield fetch(url, Object.assign({ headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                "Content-Type": "application/json; charset=UTF-8",
                "User-Agent": "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
            } }, options));
        if (!res.ok) {
            const data = yield res.json();
            console.log(res.status);
            throw new Error(JSON.stringify(data));
        }
        return res;
    });
}
exports.DiscordRequest = DiscordRequest;
function InstallGlobalCommands(appId, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = `applications/${appId}/commands`;
        const commandsPayload = JSON.stringify(commands);
        try {
            yield DiscordRequest(endpoint, {
                method: "PUT",
                body: commands,
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.InstallGlobalCommands = InstallGlobalCommands;
