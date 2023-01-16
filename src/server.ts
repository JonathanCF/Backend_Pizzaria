import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from 'cors'
import path from 'path'

const app = express();
app.use(express.json());
app.use(cors())

app.use(router);

app.use(
	'/files',
	express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if(err instanceof Error){
		// Se for uma instancia do tipo ERROR
		return res.status(400).json({
			error: err.message
		})
	}
		return res.status(500).json({
			status: 'error',
			message: 'Internal server error.'
		})
});

app.listen(process.env.PGPORT, () => {
  console.log("Servidor rodando na port " + process.env.PGPORT);
});
