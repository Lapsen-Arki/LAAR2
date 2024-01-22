import React from 'react'
import { useState, ChangeEvent } from 'react'
import './TimeBlocking.css';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface FoodDropDownProps {
	id: string;
	value: string;
	options: string[];
	onChange: (event: SelectChangeEvent<any>) => void;
}

const FoodDropDown: React.FC<FoodDropDownProps> = ({ id, value, options, onChange }) => {

	const CustomSelect = styled(Select)({
		width: '200px'
	});

return (
	<FormControl fullWidth>
		<CustomSelect
			id={id}
			value={value}
			onChange={onChange}
			displayEmpty
			inputProps={{ 'aria-label': 'Without label' }}
		>
			{options.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</CustomSelect>
	</FormControl>
)}

export default function TimeBlockPreview() {

	const [target, setTarget] = useState<string>("");
	const [porridge, setPorridge] = useState<string>("");
	const [drink, setDrink] = useState<string>("");
	const [fruit, setFruit] = useState<string>("");
	const [bread, setBread] = useState<string>("");
	const [culturedDairy, setCulturedDairy] = useState<string>("");

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		textAlign: 'left',
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
	}));
	
	const handleChange = ( setState: React.Dispatch<React.SetStateAction<string>>, value: string ) => {
		setState(value);
	};
	
	const handleSelectChange = (stateSetter: React.Dispatch<React.SetStateAction<string>>) => ( e: SelectChangeEvent<string | number> ) => {
		handleChange(stateSetter, e.target.value as string);
	};

	return (
		<div className="preview-page">
			<div className="preview-top-panel">
				<div className="preview-image">

				</div>
				<div className="preview-top-right">
					<div className="preview-description">
						<h1>Lapsen arkirytmi</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
					</div>
					<div className="preview-top-right-bottom">
						<div className="preview-grid-title">
							<h2>Luo ateria</h2>
						</div>
						<div className="preview-target">
							<FormControl fullWidth>
								<InputLabel id="preview-target-label">Lapsi</InputLabel>
								<Select
									labelId="preview-target-label"
									id="preview-target-select"
									value={target}
									label="Lapsi"
									onChange={handleSelectChange(setTarget)}
									>
									<MenuItem value={"Ulpukka"}>Ulpukka</MenuItem>
									<MenuItem value={"Kullervo"}>Kullervo</MenuItem>
								</Select>
							</FormControl>
						</div>
					</div>
				</div>
			</div>
			<div className="preview-grid">
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<Item>
								<p>puuro</p>
								<FoodDropDown id="porridge" value={porridge} options={["kaurapuuro", "mannapuuro"]} onChange={handleSelectChange(setPorridge)} />
							</Item>
						</Grid>
						<Grid item xs={12} md={4}>
							<Item className="preview-select">
								<p>juoma</p>
								<FoodDropDown id="drink" value={drink} options={["maito", "kauramaito"]} onChange={handleSelectChange(setDrink)} />
							</Item>
						</Grid>
						<Grid item xs={12} md={4}>
							<Item className="preview-select">
								<p>hedelmä/marja</p>
								<FoodDropDown id="fruit" value={fruit} options={["mustikka", "banaani"]} onChange={handleSelectChange(setFruit)} />
							</Item>
						</Grid>
						<Grid item xs={12} md={4}>
							<Item className="preview-select">
								<p>leipä</p>
								<FoodDropDown id="bread" value={bread} options={["ruisleipä", "kauraleipä"]} onChange={handleSelectChange(setBread)} />
							</Item>
						</Grid>
						<Grid item xs={12} md={4}>
							<Item className="preview-select">
								<p>hapanmaitotuotteet</p>
								<FoodDropDown id="cultured-dairy" value={culturedDairy} options={["rahka", "piimä"]} onChange={handleSelectChange(setCulturedDairy)} />
							</Item>
						</Grid>
						<Grid item xs={12} md={4}>
							<Item className="preview-select">
								<p>juoma</p>
								<FoodDropDown id="drink" value={drink} options={["maito", "kauramaito"]} onChange={handleSelectChange(setDrink)} />
							</Item>
						</Grid>
					</Grid>
				</Box>
			</div>
			<div className="preview-register">
				<Button component={Link} to="/register" variant="contained" sx={{ backgroundColor: '#39C4A3'}}>
					Register
				</Button>
			</div>
		</div>
  	);
}