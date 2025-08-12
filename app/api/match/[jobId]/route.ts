import { supabase } from '@/lib/supabase'

export async function GET(_: Request, { params }: { params: { jobId: string } }) {
  const { data: job } = await supabase.from('jobs').select('embedding').eq('id', params.jobId).single()
  if (!job) return new Response('Job not found', { status: 404 })

  const { data } = await supabase.rpc('match_candidates', { job_embedding: job.embedding, k: 5 })
  return Response.json(data)
}
