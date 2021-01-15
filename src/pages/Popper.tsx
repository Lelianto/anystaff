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
	selected?: any[]
}
const AddCalendarPopper = ({ anchorEl, handleClose, handleClick, selected }: Props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getShifts())
	}, [dispatch]);

	const [nameShift, setNameShift] = useState<string>('')
	const [disableSend, setDisableSend] = useState<boolean>(false)

	const addShift = async () => {
		setDisableSend(true)
		if (selected && selected.length !== 0 && nameShift) {
			let status = 0
			selected.map((content, index) => {
				let startTime = content.day * 1000 + content.startHour * 3600 * 1000
				let endHour = content.day * 1000 + content.endHour * 3600 * 1000
				let data: object = {
					name: nameShift,
					startTime: startTime,
					endTime: endHour,
					date: content.day * 1000
				}
				dispatch(postShift(data))
				status += 1
			})
			if (selected.length === status) {
				setDisableSend(false)
				dispatch(getShifts())
			}
		}
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
							<Button disabled={disableSend} variant="contained" color="primary" onClick={addShift}> Save Schedule </Button>
						</div>
					</div>
				</div>
			</Popover>
		</div>
	)
}

export default AddCalendarPopper;