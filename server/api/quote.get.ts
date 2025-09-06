import { getRandomQuote } from "~/server/utils/quotes";

export default defineEventHandler(async (event) => {
  try {
    const quote = await getRandomQuote();

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
