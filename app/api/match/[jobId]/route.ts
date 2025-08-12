import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(_: Request, { params }: { params: { jobId: string }}) {
  const jobId = Number(params.jobId);
  const { data: job, error: jErr } = await supabase.from('jobs').select('embedding').eq('id', jobId).single();
  if (jErr) return NextResponse.json({ error: jErr.message }, { status: 400 });
  if (!job?.embedding) return NextResponse.json({ results: [] });

  const { data, error } = await supabase.rpc('match_candidates', { job_embedding: job.embedding, k: 10 });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ job_id: jobId, results: data });
}
