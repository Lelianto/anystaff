import {
	ShiftsStateType,
	ShiftActionTypes,
} from '../types/ShiftTypes';

const initialStateShifts: ShiftsStateType = {
	shifts: [],
	postShift: [],
	calendarData:[]
}

export const getShiftsReducer = (
	state = initialStateShifts,
	action: ShiftActionTypes
): ShiftsStateType => {
	switch (action.type) {
		case 'GET_SHIFTS':
			return {
				...state,
				shifts: action.payload
			};
		case 'POST_SHIFTS':
			return {
				...state,
				postShift: action.payload
			};
		case 'ADD_CALENDAR_DATA':
			return {
				...state,
				calendarData: action.payload
			};
		default:
			return state;
	}
};
