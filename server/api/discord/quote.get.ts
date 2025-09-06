import { getRandomQuote } from "../utils/quotes";

export default defineEventHandler(async (event) => {
  try {
    const quote = await getRandomQuote();

    // Optional: disable caching
    setResponseHeader(event, "Cache-Control", "no-store");

    return { quote };
  } catch (e) {
    setResponseStatus(event, 500);
    return { error: "No quotes available" };
  }
});
