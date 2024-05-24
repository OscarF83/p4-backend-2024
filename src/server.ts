import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { db } from './db';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/technicians", async (req, res) => {
    try{
        const technicians = await db.technicians.findMany({
        orderBy:{firstName: "asc"}
        })
        res.status(200).json(technicians);
    }catch (e){
        res.status(500).json({error: "Internal Error"});
    }
});

const {PORT} = process.env;
app.listen(PORT, () => {
    console.log(`My server listening on http://localhost:${PORT}`);
})