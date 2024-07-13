"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = 3000;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_json_1 = __importDefault(require("../data.json"));
let currentTimestamp;
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.get("/search", (req, res) => {
    console.log("privet");
    const queryEmail = req.query.email;
    const queryNumber = req.query.number;
    const queryTimestamp = req.query.timestamp;
    currentTimestamp = Number(queryTimestamp);
    setTimeout(() => {
        if (currentTimestamp === Number(queryTimestamp)) {
            res.send(find(data_json_1.default, queryEmail, queryNumber));
        }
    }, 2000);
});
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
function find(arr, email, num) {
    const numParsed = num ? num.replaceAll(/-/g, "") : null;
    const result = arr.filter((el) => {
        if (el.email === email &&
            (numParsed ? el.number.indexOf(numParsed) >= 0 : true)) {
            return el;
        }
    });
    return result;
}
