
import { getShiftsAction, postShiftAction, addCalendarData } from '../actions/ShiftActions';
import { Dispatch } from 'redux';
import { ShiftActionTypes } from '../types/ShiftTypes';
import env from "react-dotenv";

export const getShifts = () => {
	return function (dispatch: Dispatch<ShiftActionTypes>) {
		const SHIFT_URL: any = env.SHIFT_API;
		fetch(SHIFT_URL, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(data => {
			dispatch(getShiftsAction(data));
			return data;
		});
	};
};

export const setCalendarData = (req: any) => {
	return function (dispatch: Dispatch<ShiftActionTypes>) { 
		dispatch(addCalendarData(req));
	}
}

export const postShift = (req: any) => {
	return function (dispatch: Dispatch<ShiftActionTypes>) {
		const SHIFT_URL: any = env.SHIFT_API;
		fetch(SHIFT_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(req)
		})
			.then(res => res.json())
			.then(data => {
				dispatch(postShiftAction(data));
				return data;
			}).catch((error) => {
				return error;
			})
	}
}