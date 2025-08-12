export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '../../../lib/supabaseAdmin';

// importaremos pdf-parse DENTRO del handler, no arriba

async function embed(text: string): Promise<number[]> {
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
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error?.message || 'Error generando embeddings');
  return data.data[0].embedding;
}

export async function POST(req: Request) {
  try {
    const pdf = (await import('pdf-parse')).default; // <- import dinámico

    const form = await req.formData();
    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const file = form.get('cv') as File | null;

    if (!name) return NextResponse.json({ error: 'Falta nombre' }, { status: 400 });
    if (!file) return NextResponse.json({ error: 'Falta CV en PDF' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const bucket = process.env.FILES_BUCKET || 'resumes';
    const path = `cvs/${Date.now()}-${file.name}`;
    const { data: upload, error: upErr } = await supabase
      .storage.from(bucket)
      .upload(path, buffer, { contentType: file.type || 'application/pdf' });
    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

    const parsed = await pdf(buffer);
    const text = (parsed.text || '').slice(0, 5000) || `${name} ${email}`;
    const e = await embed(text);

    const { data, error } = await supabase
      .from('candidates')
      .insert({ name, email, resume_url: upload?.path, profile_json: { len: text.length }, embedding: e })
      .select('id')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ id: data.id, resume_url: upload?.path });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error' }, { status: 500 });
  }
}
