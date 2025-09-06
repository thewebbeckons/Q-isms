import { promises as fs } from "node:fs";
import { join } from "node:path";

export async function getRandomQuote(): Promise<string> {
  const filePath = join(process.cwd(), "public", "data.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(raw) as { quotes?: string[] };
  const quotes = Array.isArray(data.quotes) ? data.quotes : [];

  if (!quotes.length) {
    throw new Error("No quotes available");
  }

  return quotes[Math.floor(Math.random() * quotes.length)];
}
