"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyDiscordRequest = void 0;
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
