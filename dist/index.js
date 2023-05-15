"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const report_1 = require("./controllers/report");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/', (req, res) => {
    const data = req.body;
    const template = fs_1.default.readFileSync('./template/index.html', 'utf8');
});
app.post('/generate', report_1.createReport);
app.listen(8002, () => console.log('listening on 8002'));
