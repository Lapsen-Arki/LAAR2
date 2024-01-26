import React from 'react'
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function Home() {
	const [target, setTarget] = useState("")
	const [insertOn, setInsertOn] = useState(false)

	const handleChange = ( setState: React.Dispatch<React.SetStateAction<string>>, value: string ) => {
		setState(value);
		setInsertOn(false) //väliaikainen ratkaisu buildeja varten
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
							{insertOn?
							<h2>Luo ateria</h2>
							:null
							}
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
		</div>
  	);
}

