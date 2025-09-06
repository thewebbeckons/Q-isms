import { getRandomQuote } from "~/server/utils/quotes";

export default defineEventHandler(async (event) => {
  try {
    const quote = await getRandomQuote();
    // Artificial 1s delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { quote };
  } catch (err) {
    // Normalize unknown errors
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load quote",
      data: { message: (err as Error)?.message },
    });
  }
});
