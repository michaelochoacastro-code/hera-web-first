'use client'
import { useState } from 'react'

export default function MatchPage() {
  const [jobId, setJobId] = useState('')
  const [results, setResults] = useState<any[]>([])

  const getMatches = async () => {
    const res = await fetch(`/api/match/${jobId}`)
    const data = await res.json()
    setResults(data)
  }

  return (
    <main>
      <h1>Match de Candidatos</h1>
      <input value={jobId} onChange={e => setJobId(e.target.value)} placeholder="ID Vacante" />
      <button onClick={getMatches}>Buscar</button>
      <ul>
        {results.map(r => (
          <li key={r.candidate_id}>ID: {r.candidate_id} - Score: {r.score}</li>
        ))}
      </ul>
    </main>
  )
}
