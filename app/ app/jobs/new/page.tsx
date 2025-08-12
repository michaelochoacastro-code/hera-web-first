'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function NewJobPage() {
  const [title, setTitle] = useState('')

  const submitJob = async () => {
    await supabase.from('jobs').insert({ title })
    alert('Vacante creada')
  }

  return (
    <main>
      <h1>Nueva vacante</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <button onClick={submitJob}>Guardar</button>
    </main>
  )
}
