import { FastifyInstance } from "fastify";
import { submitForm } from "../controllers/form.controller";

export async function formRoutes(app: FastifyInstance) {
  app.post("/forms", submitForm);
}
