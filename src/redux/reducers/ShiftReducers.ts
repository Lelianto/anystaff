import {
	ShiftsStateType,
	ShiftActionTypes,
} from '../types/ShiftTypes';

const initialStateShifts: ShiftsStateType = {
	shifts: [],
	postShift: []
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
		default:
			return state;
	}
};
