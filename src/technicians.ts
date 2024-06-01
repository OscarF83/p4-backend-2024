import { db } from "./db";
import { Router } from "express";
import { send } from "./response";
import { z } from "zod";
import { catchErrors } from "./error";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});
const technicianBodySchema = z.object({
  firstName: z.string().min(5).max(20),
  lastName: z.string().min(5).max(20),
});

router.get(
  "/",
  catchErrors(async (req, res) => {
    const technicians = await db.technicians.findMany({
      orderBy: { firstName: "asc" },
    });
    send(res).ok(technicians);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const technicianData = technicianBodySchema.parse(req.body);
    const newTechnician = await db.technicians.create({ data: technicianData });
    send(res).createOk(newTechnician);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: techId } = idParamSchema.parse(req.params);
    const technician = await db.technicians.findUniqueOrThrow({
      where: { techId },
    });
    send(res).ok(technician);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: techId } = idParamSchema.parse(req.params);
    const newTechnicianData = technicianBodySchema.parse(req.body);
    const updateTechnician = await db.technicians.update({
      where: { techId },
      data: newTechnicianData,
    });
    send(res).ok(updateTechnician);
  })
);

// Delete technician -> Se deja comentado en el código. Se decide no utilizarlo puesto que el schema 
// de la base de datos no permite borrar o elimninar un technician que forme parte ya de un registro 
// de la entidad hoursRegister. En caso de querer cambiar el nombre del technician se puede realizar un PUT (Update).

/*router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: techId } = idParamSchema.parse(req.params);
    const deleteTechnician = await db.technicians.delete({ where: { techId } });
    send(res).ok(deleteTechnician);
  })
);*/

export default router;
