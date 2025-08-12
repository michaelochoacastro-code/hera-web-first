'use client';
import { useState } from 'react';

export default function NewCandidatePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const submitCandidate = async () => {
    if (!name) return alert('Escribe el nombre');
    if (!file) return alert('Adjunta un CV en PDF');

    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('cv', file);

    const resp = await fetch('/api/candidates', { method: 'POST', body: fd });
    const data = await resp.json();
    if (!resp.ok) return alert(data.error || 'Error subiendo candidato');
    alert(`Candidato creado (ID ${data.id})`);
  };

  return (
    <main>
      <h1>Nuevo candidato</h1>
      <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email (opcional)" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button onClick={submitCandidate}>Guardar</button>
    </main>
  );
}
