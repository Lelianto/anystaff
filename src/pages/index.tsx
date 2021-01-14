import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/store';

import { getShifts, postShift } from '../redux/effects/Shifts';
import { Shift } from '../redux/interfaces/Shift';
import App from './App';
import { items } from './day-data';

const ShiftPage = () => {
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
		<App items={items} shifts={shifts}/>
	)
}
		// <div>
		// 	<div className="albums">
		// 	</div>
		// 		{/* <div>{shiftItems}</div> */}
		// 	<div className="container">
		// 		<div className="row">
		// 			{/* <div className="col-12">
		// 				Name <input type="text" onChange={(e:any)=>setNameShift(e.target.value)}/>
		// 			</div>
		// 			<button onClick={addShift}>
		// 				Add
		// 			</button> */}

		// 		</div>
		// 		{/* <div className="row">
		// 			<div className="col-12">
		// 				BOX
		// 			</div>
		// 		</div> */}
		// 	</div>
		// </div>

export default ShiftPage;