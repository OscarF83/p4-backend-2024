import { db } from "./db";
import { Router } from "express";
import { send } from "./response";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const technicians = await db.technicians.findMany({
      orderBy: { firstName: "asc" },
    });
    send(res).ok(technicians);
  } catch (e) {
    send(res).internalError(`Could not get technicians`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName } = req.body;
    const { lastName } = req.body;
    if (firstName === undefined || typeof firstName !== "string") {
        return send(res).badRequest(`Missing 'firstName' field or incorrect data type`);
    }
    if (lastName === undefined || typeof lastName !== "string") {
      return send(res).badRequest(`Missing 'lastName' field or incorrect data type`);
    }
    const newTechnician = await db.technicians.create({
      data: {
        firstName,
        lastName,
      },
    });
    send(res).createOk(newTechnician);
  } catch (e) {
    send(res).internalError(`Couldn't create new technician. Try again later...` );
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const technician = await db.technicians.findUniqueOrThrow({
      where: { techId: Number(id) },
    });
    send(res).ok(technician);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      return send(res).notFound();
    }
    send(res).internalError(`Internal error`);
  }
});

export default router;
