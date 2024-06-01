import { db } from "./db";
import { Router } from "express";
import { send } from "./response";
import { z } from "zod";
import { catchErrors } from "./error";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});
const registerBodySchema = z.object({
  day: z.string().date(),
  hours: z.coerce.number(),
  techId: z.coerce.number(),
  labId: z.coerce.number(),
  projectId: z.coerce.number(),
});

router.get(
  "/",
  catchErrors(async (req, res) => {
    const registers = await db.hoursRegister.findMany({
      orderBy: { day: "asc" },
    });
    send(res).ok(registers);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const registerData = registerBodySchema.parse(req.body);
    const newRegister = await db.hoursRegister.create({ data: registerData });
    send(res).createOk(newRegister);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: hoursRegisterId } = idParamSchema.parse(req.params);
    const register = await db.hoursRegister.findUniqueOrThrow({
      where: { hoursRegisterId },
    });
    send(res).ok(register);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: hoursRegisterId } = idParamSchema.parse(req.params);
    const newRegisterData = registerBodySchema.parse(req.body);
    const updateRegister = await db.hoursRegister.update({
      where: { hoursRegisterId },
      data: newRegisterData,
    });
    send(res).ok(updateRegister);
  })
);

router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: hoursRegisterId } = idParamSchema.parse(req.params);
    const deleteRegister = await db.hoursRegister.delete({ where: { hoursRegisterId } });
    send(res).ok(deleteRegister);
  })
);

export default router;
