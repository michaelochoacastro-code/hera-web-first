import { supabase } from '@/lib/supabase'
import { generateEmbedding } from '@/lib/embeddings'

export async function POST(req: Request) {
  const body = await req.json()
  const embedding = await generateEmbedding(body.title)
  const { data, error } = await supabase.from('jobs').insert({
    ...body,
    embedding
  })
  if (error) return new Response(error.message, { status: 400 })
  return Response.json(data)
}
