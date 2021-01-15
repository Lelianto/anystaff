import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShifts, postShift } from '../redux/effects/Shifts';
import { AppState } from '../redux/store';

import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import '../styles/index.css'
import Button from '@material-ui/core/Button';

interface Props {
	anchorEl?: any,
	handleClose?: any,
	handleClick?: any,
	selected?:any[]
} 
const AddCalendarPopper = ({ anchorEl, handleClose, handleClick, selected}:Props) =>{
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getShifts())
	}, [dispatch]);

	const shifts = useSelector((state: AppState) => state.shifts);
	const [nameShift, setNameShift] = useState<string>('')

	const addShift = async () => {
		let data: object = {
			name: nameShift,
			startTime: new Date().getTime() + 1000,
			endTime: new Date().getTime() + 100000,
			date: new Date().getTime() - 100000
		}

		// const result: any = dispatch(postShift(data))
		console.log('result data', selected)
	}
	return (
		<div>
			<Popover
				id="pop-over"
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<div className="container-custom">
					<div className="row">
						<div className="title-input">
							StaffAny Calendar
								</div>
						<div className="handle-input">
							<TextField id="outlined-basic" onChange={(e) => setNameShift(e.target.value)} label="Input Your Activity" variant="outlined" />
						</div>
						<div className="button-setting">
							<Button variant="contained" color="primary" onClick={addShift}> Save Schedule </Button>
						</div>
					</div>
				</div>
			</Popover>
		</div>
	)
}

export default AddCalendarPopper;