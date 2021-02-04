import express, { Response, Request } from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import Email from './routes/email.routes';
import dotenv from "dotenv";

dotenv.config()

const app: any = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

// midleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'static')));

// routes
app.get('/', (req: Request, res: Response) => {
  res.render('contact', { layout: false })
})
app.use('/email', Email);

app.listen(PORT, console.log(`listen in the port ${PORT}`));
