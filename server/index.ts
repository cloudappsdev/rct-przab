import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "../src/lib/prisma.js";
import { safeQuery } from "../src/lib/prisma-safe.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/foo", async (_req, res) => {
  const data = "jay";
  res.json(data);
});

app.get("/api/authors", async (_req, res) => {
  const { data, error } = await safeQuery(() =>
    prisma.author.findMany({ include: { books: true } }),
  );
  if (error) {
    res.status(500).json({ error });
    return;
  }
  res.json(data);
});

app.get("/api/authors/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const { data, error } = await safeQuery(() =>
    prisma.author.findUniqueOrThrow({
      where: { id },
      include: { books: true },
    }),
  );
  if (error) {
    res.status(404).json({ error });
    return;
  }
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
