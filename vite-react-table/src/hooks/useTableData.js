import { useState, useEffect } from 'react';

export function useTableData(queryParams = '') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/getData${queryParams ? `?${queryParams}` : ''}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(result => {
        setData(result);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [queryParams]);

  return { data, loading, error };
}
