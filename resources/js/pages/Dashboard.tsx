import { usePage } from '@inertiajs/react'
import { useState } from 'react'

interface Person {
  id: number
  name: string
  email: string
  document: string
  phone: string
  purchase_date: string | null
  product_id: number | null
  status: string
  created_at: string
  behavioral_profile_test?: {
    profile?: string
  } | null
}

export default function Dashboard() {
  const { persons, search } = usePage<{ persons: Person[], search: string }>().props

  const [filter, setFilter] = useState(search || '')

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      window.location.href = `/dashboard?search=${encodeURIComponent(filter)}`
    }
  }

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>

      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Buscar por nome, email ou documento"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={handleSearch}
          style={styles.inputSearch}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Documento</th>
              <th>Telefone</th>
              <th>Data da Compra</th>
              <th>Produto</th>
              <th>Status</th>
              <th>Criado em</th>
              <th>Perfil</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.document}</td>
                <td>{p.phone}</td>
                <td>{format(p.purchase_date)}</td>
                <td>{p.product_id ?? '-'}</td>
                <td>
                  <span style={{ ...styles.badge, ...badgeColor(p.status) }}>
                    {translateStatus(p.status)}
                  </span>
                </td>
                <td>{format(p.created_at)}</td>
                <td>{p.behavioral_profile_test?.profile ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function translateStatus(status: string) {
  switch (status) {
    case 'pending': return 'Pendente'
    case 'approved': return 'Aprovado'
    case 'refunded': return 'Estornado'
    default: return status
  }
}

function badgeColor(status: string) {
  switch (status) {
    case 'pending': return { backgroundColor: '#facc15', color: '#000' }
    case 'approved': return { backgroundColor: '#4ade80', color: '#000' }
    case 'refunded': return { backgroundColor: '#f87171', color: '#fff' }
    default: return { backgroundColor: '#cbd5e1', color: '#000' }
  }
}

function format(date: string | null) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR')
}

const styles = {
  container: {
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: 1200,
    margin: '0 auto',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputSearch: {
    padding: '10px',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '12px',
  },
}
