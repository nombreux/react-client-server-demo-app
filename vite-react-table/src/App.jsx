import { useState } from 'react'
import './App.css'
import { TableFilter } from './components/TableFilter'
import { Table } from './components/Table'
import { useTableData } from './hooks/useTableData'

function App() {
  const [queryParams, setQueryParams] = useState('');
  const { data, loading, error } = useTableData(queryParams);

  const handleFilterChange = (newQueryParams) => {
    setQueryParams(newQueryParams);
  };

  return (
    <div className="app-container">
      <h1>Employee Data</h1>
      <TableFilter onFilterChange={handleFilterChange} />
      {error && <div className="error-message">Error: {error}</div>}
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <Table data={data} />
      )}
    </div>
  )
}

export default App
