import {
    GET_SHIFTS,
    GetShiftsStateType,
    ShiftActionTypes
} from '../types/ShiftTypes';

const initialStateGetShifts: GetShiftsStateType = {
    shifts: []
};

export const getShiftsReducer = (
    state = initialStateGetShifts,
    action: ShiftActionTypes
): GetShiftsStateType => {
    switch (action.type) {
        case GET_SHIFTS:
            return {
                ...state,
                shifts: action.payload
            };
        default:
            return state;
    }
};
