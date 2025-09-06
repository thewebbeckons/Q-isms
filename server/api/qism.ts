import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Read the data.json file from the public directory
    const dataPath = join(process.cwd(), 'public', 'data.json')
    const data = await readFile(dataPath, 'utf-8')
    const quotesData = JSON.parse(data)
    
    // Get a random quote from the quotes array
    const randomIndex = Math.floor(Math.random() * quotesData.quotes.length)
    const randomQuote = quotesData.quotes[randomIndex]
    
    return {
      success: true,
      quote: randomQuote,
      author: 'Q (Tony)'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch quote'
    })
  }
})