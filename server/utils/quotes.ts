import data from "~/server/utils/quotes.json";

export async function getRandomQuote(): Promise<string> {
  const quotes = Array.isArray((data as any).quotes)
    ? ((data as any).quotes as string[])
    : [];

  if (!quotes.length) {
    throw new Error("No quotes available");
  }

  return quotes[Math.floor(Math.random() * quotes.length)];
}
