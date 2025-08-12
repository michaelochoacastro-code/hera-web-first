'use client';
import { useState } from 'react';

export default function Match(){
  const [jobId, setJobId] = useState('1');
  const [rows, setRows] = useState<any[]>([]);
  const run = async () => {
    const resp = await fetch(`/api/match/${jobId}`, { method:'POST' });
    const data = await resp.json();
    if (!resp.ok) return alert(data.error || 'Error en match');
    setRows(data.results || []);
  };
  return (
    <main style={{padding:16, maxWidth:720, margin:'0 auto'}}>
      <h1>Matching</h1>
      <div>
        <input value={jobId} onChange={e=>setJobId(e.target.value)} />
        <button onClick={run}>Ejecutar</button>
      </div>
      <ul>
        {rows.map((r,i)=> <li key={i}>Candidato #{r.candidate_id} — Score: {Number(r.score).toFixed(2)}</li>)}
      </ul>
    </main>
  );
}
