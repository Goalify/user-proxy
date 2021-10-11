"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();

const { MONGO_URI } = process.env;
const databaseConnect = () => {
    // Connecting to the database
    mongoose_1.default
        .connect(MONGO_URI)
        .then(() => {
        // tslint:disable-next-line:no-console
        console.log("Successfully connected to database");
    })
        .catch((error) => {
        // tslint:disable-next-line:no-console
        console.log("database connection failed. exiting now...");
        // tslint:disable-next-line:no-console
        console.error(error);
        process.exit(1);
    });
};
exports.default = databaseConnect;
//# sourceMappingURL=database.js.map