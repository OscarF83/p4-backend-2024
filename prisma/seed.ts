import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/*const labNames2 = ["lab1", "lab2", "lab3"];

labNames2.forEach(async (value)=>{
    const laboratory1 = await db.laboratories.create({
        data: {
          labName: value,
        },
      });
})*/

try {

const laboratory1 = await db.laboratories.create({
    data: {
      labName: "EmcChamberLab",
    },
  });
console.log(`Created laboratory "${laboratory1.labName}" with id "${laboratory1.labId}"`);

const laboratory2 = await db.laboratories.create({
    data: {
      labName: "SoftwareControlLab",
    },
  });
console.log(`Created laboratory "${laboratory2.labName}" with id "${laboratory2.labId}"`);

const laboratory3 = await db.laboratories.create({
    data: {
      labName: "Calorimeter",
    },
  });
console.log(`Created laboratory "${laboratory3.labName}" with id "${laboratory3.labId}"`);

const project1 = await db.projects.create({
    data: {
      projectName: "IU_Yutaki",
    },
  });
console.log(`Created project "${project1.projectName}" with id "${project1.projectId}"`);

const project2 = await db.projects.create({
    data: {
      projectName: "ODU_R290",
    },
  });
console.log(`Created project "${project2.projectName}" with id "${project2.projectId}"`);

const project3 = await db.projects.create({
    data: {
      projectName: "ODU_R32",
    },
  });
console.log(`Created project "${project3.projectName}" with id "${project3.projectId}"`);

const technician1 = await db.technicians.create({
  data: {
    firstName: "Juan",
    lastName: "Alcaraz",
  },
});
console.log(`Created technician "${technician1.firstName} ${technician1.lastName}" with id "${technician1.techId}"`);

const technician2 = await db.technicians.create({
  data: {
    firstName: "Carlos",
    lastName: "Monte",
  },
});
console.log(`Created technician "${technician2.firstName} ${technician2.lastName}" with id "${technician2.techId}"`);

const technician3 = await db.technicians.create({
  data: {
    firstName: "Antonio",
    lastName: "Molina",
  },
});
console.log(`Created technician "${technician3.firstName} ${technician3.lastName}" with id "${technician3.techId}"`);

const technician4 = await db.technicians.create({
  data: {
    firstName: "Cristina",
    lastName: "Gonzalez",
  },
});
console.log(`Created technician "${technician4.firstName} ${technician4.lastName}" with id "${technician4.techId}"`);

const register1 = await db.hoursRegister.create({
    data: {
      day: "03-05-2024",
      hours: 8,
      techId: technician1.techId,
      labId: laboratory1.labId,
      projectId: project1.projectId,
    },
  });
console.log(`Created register with id "${register1.hoursRegisterId}"`);

const register2 = await db.hoursRegister.create({
    data: {
      day: "03-05-2024",
      hours: 6,
      techId: technician2.techId,
      labId: laboratory2.labId,
      projectId: project2.projectId,
    },
  });
console.log(`Created register with id "${register2.hoursRegisterId}"`);

const register3 = await db.hoursRegister.create({
    data: {
      day: "03-05-2024",
      hours: 6,
      techId: technician3.techId,
      labId: laboratory2.labId,
      projectId: project2.projectId,
    },
  });
console.log(`Created register with id "${register3.hoursRegisterId}"`);

const register4 = await db.hoursRegister.create({
    data: {
      day: "03-05-2024",
      hours: 8,
      techId: technician4.techId,
      labId: laboratory3.labId,
      projectId: project3.projectId,
    },
  });
console.log(`Created register with id "${register4.hoursRegisterId}"`);

const register5 = await db.hoursRegister.create({
    data: {
      day: "04-05-2024",
      hours: 8,
      techId: technician3.techId,
      labId: laboratory2.labId,
      projectId: project2.projectId,
    },
  });
console.log(`Created register with id "${register5.hoursRegisterId}"`);

const register6 = await db.hoursRegister.create({
    data: {
      day: "04-05-2024",
      hours: 5,
      techId: technician4.techId,
      labId: laboratory3.labId,
      projectId: project3.projectId,
    },
  });
console.log(`Created register with id "${register6.hoursRegisterId}"`);
} catch (e) {
  console.error(`Error: Database. Remember that seed.ts only can be executed one time.`);
  process.exit(1);
}