"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const env = (key) => {
    return process.env[key];
};
exports.default = {
    PORT: (_a = env('PORT')) !== null && _a !== void 0 ? _a : 3000,
};
