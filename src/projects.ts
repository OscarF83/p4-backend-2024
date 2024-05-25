import { db } from "./db";
import { Router } from "express";
import { send } from "./response";
import { z } from "zod";
import { catchErrors } from "./error";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});
const projectBodySchema = z.object({
  projectName: z.string().min(5).max(20),
});

router.get(
  "/",
  catchErrors(async (req, res) => {
    const projects = await db.projects.findMany({
      orderBy: { projectName: "asc" },
    });
    send(res).ok(projects);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const projectData = projectBodySchema.parse(req.body);
    const newProject = await db.projects.create({ data: projectData });
    send(res).createOk(newProject);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: projectId } = idParamSchema.parse(req.params);
    const project = await db.projects.findUniqueOrThrow({
      where: { projectId },
    });
    send(res).ok(project);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: projectId } = idParamSchema.parse(req.params);
    const projectNewData = projectBodySchema.parse(req.body);
    const updateProject = await db.projects.update({
      where: { projectId },
      data: projectNewData,
    });
    send(res).ok(updateProject);
  })
);

router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: projectId } = idParamSchema.parse(req.params);
    const deleteProject = await db.projects.delete({ where: { projectId } });
    send(res).ok(deleteProject);
  })
);

export default router;
