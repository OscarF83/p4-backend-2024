import express from "express";
import morgan from "morgan";
import cors from "cors";
import techniciansRouter from './technicians';
import laboratoriesRouter from './laboratories';
import projectsRouter from './projects';
import registersRouter from './registers';
import { defaultErrorHandler } from "./error";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/technicians", techniciansRouter);
app.use("/laboratories", laboratoriesRouter);
app.use("/projects", projectsRouter);
app.use("/registers", registersRouter);

app.use(defaultErrorHandler); //Este middleware captura next(e)

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`My server listening on http://localhost:${PORT}`);
});
