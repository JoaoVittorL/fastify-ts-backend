import { buildApp } from "./app";

const app = buildApp();

app.listen({ port: 4000 }).then(() => {
  console.log("Server running on http://localhost:4000");
});
