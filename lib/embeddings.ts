export async function embed(text: string): Promise<number[]> {
  const resp = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.EMBEDDINGS_MODEL || 'text-embedding-3-small',
      input: text
    })
  })
  const data = await resp.json()
  if (!resp.ok) throw new Error(data.error?.message || 'Error generando embeddings')
  return data.data[0].embedding
}
