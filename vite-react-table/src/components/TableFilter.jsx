import { useState } from 'react';

export function TableFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    role: '',
    department: '',
    location: '',
    minAge: '',
    maxAge: '',
    search: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    const queryParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    onFilterChange(queryParams.toString());
  };

  return (
    <div className="filter-container">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="role">Role:</label>
          <select 
            name="role" 
            id="role"
            value={filters.role}
            onChange={handleFilterChange}
          >
            <option value="">All Roles</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="department">Department:</label>
          <select 
            name="department" 
            id="department"
            value={filters.department}
            onChange={handleFilterChange}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="location">Location:</label>
          <select 
            name="location" 
            id="location"
            value={filters.location}
            onChange={handleFilterChange}
          >
            <option value="">All Locations</option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Boston">Boston</option>
          </select>
        </div>
      </div>
    </div>
  );
}
