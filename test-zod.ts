import { z } from "zod";
const schema = z.object({ registrationType: z.literal("workshop") });
console.log(schema.safeParse({ registrationType: ["workshop"] }));
console.log(schema.safeParse({ registrationType: "workshop" }));
