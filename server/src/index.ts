import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Routes from './routes';
import swagger from './swagger.json';
const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use(cors({ origin: true, methods: 'POST,GET,PUT,DELETE,OPTIONS'}));

app.use("/swagger", (req, res) => res.send(swagger));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swagger)
);

app.use('/api', Routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err.stack);    // e.g., Not valid name
	return res.status(500).send('Internal Server Occured');
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});