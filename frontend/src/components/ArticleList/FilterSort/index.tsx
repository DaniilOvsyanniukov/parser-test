import React, { useState } from 'react'
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material'

interface FilterSortProps {
  onApply: (search: string, sort: string) => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ onApply }) => {
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('')

	return (
		<Box display="flex" gap={2} mb={2} sx={{ padding: '20px', width: 'auto', maxWidth: '680px' }}>
			<TextField 
				label="Search" 
				variant="outlined" 
				value={search} 
				onChange={(e) => setSearch(e.target.value)} 
				sx={{ width: '220px' }}
			/>
			<FormControl fullWidth sx={{ width: '220px' }}>
				<InputLabel>Sort By</InputLabel>
				<Select
					value={sort}
					label="Sort By"
					onChange={(e) => setSort(e.target.value)}
				>
					<MenuItem value="title">Title</MenuItem>
					<MenuItem value="date">Date</MenuItem>
				</Select>
			</FormControl>
			<Button variant="contained" onClick={() => onApply(search, sort)} sx={{ width: '100px' }}>Apply</Button>
		</Box>
	)
}

export default FilterSort
