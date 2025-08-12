import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { embed } from '../../../lib/embeddings';

export async function POST(req: Request){
  try {
    const body = await req.json();
    const { title, description_md = '', skills_required = [] } = body;

    const text = `${title}\n${description_md}\n${skills_required.join(',')}`;
    const e = await embed(text);

    const { data, error } = await supabase
      .from('jobs')
      .insert({ title, description_md, skills_required, embedding: e })
      .select('id')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ id: data.id });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || 'Error' }, { status: 500 });
  }
}
