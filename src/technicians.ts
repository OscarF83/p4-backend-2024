import { db } from "./db";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const technicians = await db.technicians.findMany({
        orderBy: { firstName: "asc" },
      });
      res.status(200).json(technicians);
    } catch (e) {
      res.status(500).json({ error: "Internal Error" });
    }
  });

  export default router