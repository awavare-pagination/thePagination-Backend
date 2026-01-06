// import Fastify from 'fastify';
// import dotenv from "dotenv";

// import './config/env';
// import './plugin/mongoConnect';
// dotenv.config();
// export const app = Fastify({ logger: true });



// app.listen({port :  3000})

// Load environment variables before anything else
import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import mongoose from "mongoose";
import { connectMongo } from "./plugin/mongoConnect";
import { formRoutes } from './routes/form.route';
import fastifyCors from "@fastify/cors";

const fastify = Fastify({ logger: true });
 

fastify.register(fastifyCors, {
  origin: true, // allow all origins, or specify your frontend URL
  methods: ['GET', 'POST', 'OPTIONS'], 
});


// Connect to Mongo
connectMongo();

fastify.get("/", async () => {
  return { message: "Server is running!" };
});

fastify.addHook("preHandler", async (request, reply) => {
  console.log("BODY RECEIVED:", request.body);
});

fastify.register(formRoutes);

fastify.listen({ port: Number(process.env.PORT) || 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
