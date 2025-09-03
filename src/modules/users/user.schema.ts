import { Type } from "@sinclair/typebox";

export const createUserSchema = {
  body: Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 6 }),
    name: Type.Optional(Type.String()),
  }),
  response: {
    201: Type.Object({
      id: Type.String(),
      email: Type.String(),
      name: Type.Optional(Type.String()),
      createdAt: Type.String({ format: "date-time" }),
    }),
  },
};
