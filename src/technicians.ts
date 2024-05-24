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

router.post("/", async (req, res) => {
  try {
    const { firstName } = req.body;
    const { lastName } = req.body;
    if (firstName === undefined || typeof firstName !== "string") {
      return res
        .status(400)
        .json({ error: "Missing `firstName` field or incorrect data type" });
    }
    if (lastName === undefined || typeof lastName !== "string") {
      return res
        .status(400)
        .json({ error: "Missing `lastName` field or incorrect data type" });
    }
    const newTechnician = await db.technicians.create({
      data: {
        firstName,
        lastName,
      },
    });
    res.status(201).json(newTechnician);
  } catch (e) {
    res
      .status(500)
      .json({ error: "Couldn't create new technician. Try again later..." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const technician = await db.technicians.findUniqueOrThrow({
      where: { techId: Number(id) },
    });
    res.status(200).json(technician);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      return res.status(404).json({ message: `Not found` });
    }
    res.status(500).json({ e });
  }
});

export default router;
