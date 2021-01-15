import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/store';

import { getShifts } from '../redux/effects/Shifts';
import App from './App';
import { items } from './day-data';

const ShiftPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getShifts());
	}, [dispatch]);

	const shifts = useSelector((state: AppState) => state.shifts);

	return (
		<App items={items} shifts={shifts.shifts} calendarData={shifts.calendarData}/>
	)
}

export default ShiftPage;