"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
// server listening
server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map