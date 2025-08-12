export async function generateEmbedding(text: string) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.EMBEDDINGS_MODEL!,
      input: text
    })
  })
  const json = await res.json()
  return json.data[0].embedding
}
