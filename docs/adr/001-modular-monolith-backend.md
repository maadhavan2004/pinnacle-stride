# ADR 001: Modular Monolith Backend Architecture

## Status
Accepted

## Context
PinnacleStride is a 4-member remote startup delivering client solutions while incubating internal products. We evaluated microservices versus a single deployable modular monolith backend.

## Decision
We chose a **modular monolith** with NestJS and Fastify.
Each business capability (Inquiries, Auth, Services, Projects, Products, Team, Technologies, FAQs) is encapsulated into its own NestJS module with strict internal controller-service-repository layering.

## Consequences
- Single deployable container simplifies operations, monitoring, and backups.
- Type-safe shared contracts across modules without network serialization overhead.
- Can be decomposed into microservices later if load or team size warrants it.
