import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

try {
  
  // Laboratories

  const labNames = ["EmcChamberLab", "SoftwareControlLab", "Calorimeter"];

  const promises = labNames.map(async (value: string) => {
    const laboratory = await db.laboratories.create({
      data: {
        labName: value,
      },
    });
  });
  const newLaboratories = await Promise.allSettled(promises);

  labNames.map((value: string, index: number) => {
    console.log(`Created laboratory "${value}" with id "${index + 1}"`);
  });

  // Projects

  const projectNames = ["IU_Yutaki", "ODU_R290", "ODU_R32"];

  const promises2 = projectNames.map(async (value: string) => {
    const project = await db.projects.create({
      data: {
        projectName: value,
      },
    });
  });
  const newProjects = await Promise.allSettled(promises2);

  projectNames.map((value: string, index: number) => {
    console.log(`Created project "${value}" with id "${index + 1}"`);
  });

  // Technicians

  const techniciansNames = [
    {
      firstName: "Juan",
      lastName: "Alcaraz",
    },
    {
      firstName: "Carlos",
      lastName: "Monte",
    },
    {
      firstName: "Antonio",
      lastName: "Molina",
    },
    {
      firstName: "Cristina",
      lastName: "Gonzalez",
    },
  ];

  const promises3 = techniciansNames.map(async (value) => {
    const technician = await db.technicians.create({
      data: {
        firstName: value.firstName,
        lastName: value.lastName,
      },
    });
  });
  const newTechnicians = await Promise.allSettled(promises3);

  techniciansNames.map((value, index: number) => {
    console.log(
      `Created technician "${value.firstName}" "${value.lastName}" with id "${
        index + 1
      }"`
    );
  });

  // Registers

  const registers = [
    {
      day: "2024-05-03",
      hours: 8,
      techId: 1,
      labId: 1,
      projectId: 1,
    },
    {
      day: "2024-05-03",
      hours: 6,
      techId: 2,
      labId: 2,
      projectId: 2,
    },
    {
      day: "2024-05-03",
      hours: 6,
      techId: 3,
      labId: 2,
      projectId: 2,
    },
    {
      day: "2024-05-03",
      hours: 8,
      techId: 4,
      labId: 3,
      projectId: 3,
    },
    {
      day: "2024-05-04",
      hours: 8,
      techId: 3,
      labId: 2,
      projectId: 2,
    },
    {
      day: "2024-05-04",
      hours: 5,
      techId: 4,
      labId: 3,
      projectId: 3,
    },
  ];

  const promises4 = registers.map(async (value) => {
    const register = await db.hoursRegister.create({
      data: {
        day: value.day,
        hours: value.hours,
        techId: value.techId,
        labId: value.labId,
        projectId: value.projectId,
      },
    });
  });
  const newRegisters = await Promise.allSettled(promises4);

  registers.map((_value, index: number) => {
    console.log(`Created register with id "${index + 1}"`);
  });
} catch (e) {
  console.error(
    `Error: Database. Remember that seed.ts only can be executed one time.`
  );
  process.exit(1);
}
