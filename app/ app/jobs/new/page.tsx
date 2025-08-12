'use client';
import { useState } from 'react';

export default function NewJob() {
  const [title, setTitle] = useState('Ejecutivo de ventas de tecnología');
  const [desc, setDesc] = useState('Responsable de prospección y visitas a clientes...');
  const [skills, setSkills] = useState('ventas B2B, prospección, CRM');

  const create = async () => {
    const resp = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description_md: desc,
        skills_required: skills.split(',').map(s => s.trim())
      })
    });
    const data = await resp.json();
    if (!resp.ok) return alert(data.error || 'Error creando vacante');
    alert('Vacante creada: ' + data.id);
  };

  return (
    <main style={{padding:16, maxWidth:720, margin:'0 auto'}}>
      <h1>Crear vacante</h1>
      <input style={{width:'100%',padding:8}} value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea style={{width:'100%',padding:8}} rows={6} value={desc} onChange={e=>setDesc(e.target.value)} />
      <input style={{width:'100%',padding:8}} value={skills} onChange={e=>setSkills(e.target.value)} />
      <button onClick={create}>Crear</button>
    </main>
  );
}
