"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var email_routes_1 = __importDefault(require("./routes/email.routes"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = express_1.default();
var PORT = process.env.PORT || 3000;
// view engine setup
app.engine('handlebars', express_handlebars_1.default());
app.set('view engine', 'handlebars');
// midleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'static')));
// routes
app.get('/', function (req, res) {
    res.render('contact', { layout: false });
});
app.use('/email', email_routes_1.default);
app.listen(PORT, console.log("listen in the port " + PORT));
