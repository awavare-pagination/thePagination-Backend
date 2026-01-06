import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { submitFormService } from "../services/form.service";

// Define schema here for clarity
const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function submitForm(
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply
) {
  console.log("HIT SSUSUSUSUSUSSUSUU");

  const parsed = formSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: "Invalid data", details: parsed.error });
  }

  await submitFormService(parsed.data);

  return reply.status(201).send({
    message: "Form submitted successfully",
  });
}
