import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin'
import { generateEmbedding } from '@/lib/embeddings'

export async function POST(req: Request) {
  const body = await req.json()
  const embedding = await generateEmbedding(body.name)
  const { data, error } = await supabase.from('candidates').insert({
    ...body,
    embedding
  })
  if (error) return new Response(error.message, { status: 400 })
  return Response.json(data)
}
