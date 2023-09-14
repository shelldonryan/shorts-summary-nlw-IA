import { pipeline } from '@xenova/transformers'

export async function summarize(text) {
  try {
    
    console.log("Realizing the summary...")

    const generator = await pipeline("summarization", "Xenova/bart-large-cnn")

    const output = await generator(text)

    console.log("Summary completed")
    return output[0].summary_text
  } catch (error) {
    console,log("Failed to summarize", error)
    throw new Error(error)
  }
}