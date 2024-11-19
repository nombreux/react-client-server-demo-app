export function Table({ data }) {
  if (!data || data.length === 0 || !data[0]) {
    return <p>No data available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map(item => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map(key => (
              <td key={key}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
