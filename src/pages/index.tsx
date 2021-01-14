import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/store';

import { getShifts, postShift } from '../redux/effects/Shifts';
import { Shift } from '../redux/interfaces/Shift';

export default function ShiftPage() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getShifts());
	}, [dispatch]);

	const shifts = useSelector((state: AppState) => state.shifts);
	const [nameShift, setNameShift] = useState<string>('')
	
	const shiftItems = shifts.shifts.map((post: Shift) => (
		<div style={{textAlign:"left"}} key={post.shiftId}>
			<h1>{post.name}</h1>
			<p>{post.date}</p>
			<p>{post.startTime}</p>
			<p>{post.endTime}</p>
		</div>
	));
	
	const addShift = async () => {
		let data: object = {
			name: nameShift,
			startTime: new Date().getTime() + 1000,
			endTime: new Date().getTime() + 100000,
			date: new Date().getTime() - 100000
		}
		
		const result: any = dispatch(postShift(data))
		console.log('result data', result)
	}
	return (
		<div>
			<div className="container">
				{/* <div>{shiftItems}</div> */}
				<div className="row">
					<div className="col-12">
						Name <input type="text" onChange={(e:any)=>setNameShift(e.target.value)}/>
					</div>
					<button onClick={addShift}>
						Add
					</button>
				</div>
			</div>
		</div>
	)
}