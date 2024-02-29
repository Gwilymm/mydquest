// pages/admin/enigmas/create.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography } from '@mui/material';
import DashboardLayout from '@/components/dashboard/DashboardLayout'; // Adjust the import path as necessary
import axios from 'axios';


const CreateEnigma = () => {
	const [ enigma, setEnigma ] = useState({
		title: '',
		description: '',
		hints: '',
		solution: '',
		qrCode: '',
	});
	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEnigma({ ...enigma, [ name ]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		    const response = await axios.post('/api/enigmas/create', enigma);
		    console.log('Created new enigma:', response.data);
		    // Redirect to the enigmas list page after successful creation
		    router.push('/admin/enigmas');
		} catch (error) {
		    console.error("Error creating enigma:", error.response ? error.response.data : error.message);
		    // Handle the error, e.g., by showing an error message in your UI
		}
	 };

	return (
		<DashboardLayout>
			<Container component="main" maxWidth="sm">
				<Typography component="h1" variant="h5">
					Create New Enigma
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="title"
						label="Title"
						name="title"
						autoComplete="title"
						autoFocus
						onChange={handleChange}
						value={enigma.title}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="description"
						label="Description"
						type="text"
						id="description"
						autoComplete="current-description"
						multiline
						rows={4}
						onChange={handleChange}
						value={enigma.description}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="hints"
						label="Hints"
						type="text"
						id="hints"
						autoComplete="current-hints"
						onChange={handleChange}
						value={enigma.hints}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="solution"
						label="Solution"
						type="text"
						id="solution"
						autoComplete="current-solution"
						onChange={handleChange}
						value={enigma.solution}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="qrCode"
						label="QR Code"
						type="text"
						id="qrCode"
						autoComplete="current-solution"
						onChange={handleChange}
						value={enigma.qrCode}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
					>
						Create Enigma
					</Button>
				</form>
			</Container>
		</DashboardLayout>
	);
};

export default CreateEnigma;
