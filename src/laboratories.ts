import { db } from "./db";
import { Router } from "express";
import { send } from "./response";
import { z } from "zod";
import { catchErrors } from "./error";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});
const laboratoryBodySchema = z.object({
  labName: z.string().min(5).max(20),
});

router.get(
  "/",
  catchErrors(async (req, res) => {
    const laboratories = await db.laboratories.findMany({
      orderBy: { labName: "asc" },
    });
    send(res).ok(laboratories);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const laboratoryData = laboratoryBodySchema.parse(req.body);
    const newLaboratory = await db.laboratories.create({ data: laboratoryData });
    send(res).createOk(newLaboratory);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: labId } = idParamSchema.parse(req.params);
    const laboratory = await db.laboratories.findUniqueOrThrow({
      where: { labId },
    });
    send(res).ok(laboratory);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: labId } = idParamSchema.parse(req.params);
    const newLaboratoryData = laboratoryBodySchema.parse(req.body);
    const updateLaboratory = await db.laboratories.update({
      where: { labId },
      data: newLaboratoryData,
    });
    send(res).ok(updateLaboratory);
  })
);

router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: labId } = idParamSchema.parse(req.params);
    const deleteLaboratory = await db.laboratories.delete({ where: { labId } });
    send(res).ok(deleteLaboratory);
  })
);

export default router;
