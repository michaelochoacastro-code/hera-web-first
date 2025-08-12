'use client'
import { useState } from 'react'
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin'

export default function NewCandidatePage() {
  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const submitCandidate = async () => {
    if (!file) return alert('Selecciona un archivo')
    const { data: uploadData, error } = await supabase.storage.from('resumes').upload(file.name, file)
    if (error) return alert(error.message)
    await supabase.from('candidates').insert({ name, resume_url: uploadData.path })
    alert('Candidato creado')
  }

  return (
    <main>
      <h1>Nuevo candidato</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" />
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={submitCandidate}>Guardar</button>
    </main>
  )
}
