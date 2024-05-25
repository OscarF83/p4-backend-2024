import { db } from "./db";
import { Router } from "express";
import { send } from "./response";
import { z } from "zod";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});
const technicianBodySchema = z.object({
  firstName: z.string().min(5).max(20),
  lastName: z.string().min(5).max(20),
});

router.get("/", async (req, res, next) => {
  try {
    const technicians = await db.technicians.findMany({
      orderBy: { firstName: "asc" },
    });
    send(res).ok(technicians);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const technicianData = technicianBodySchema.parse(req.body);
    const newTechnician = await db.technicians.create({ data: technicianData });
    send(res).createOk(newTechnician);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id: techId } = idParamSchema.parse(req.params);
    const technician = await db.technicians.findUniqueOrThrow({
      where: { techId },
    });
    send(res).ok(technician);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id: techId } = idParamSchema.parse(req.params);
    const newTechnicianData = technicianBodySchema.parse(req.body);
    const updateTechnician = await db.technicians.update({
      where: { techId },
      data: newTechnicianData,
    });
    send(res).ok(updateTechnician);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id: techId } = idParamSchema.parse(req.params);
    const deleteTechnician = await db.technicians.delete({ where: { techId } });
    send(res).ok(deleteTechnician);
  } catch (e) {
    next(e);
  }
});

export default router;
