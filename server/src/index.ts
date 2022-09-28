import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Routes from './routes';
import { errorHandler } from './shared/middleware';
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
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});