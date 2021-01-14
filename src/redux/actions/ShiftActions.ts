import { GET_SHIFTS, ShiftActionTypes } from '../types/ShiftTypes';
import { Shift } from '../interfaces/Shift';

export const getShiftsAction = (posts: Shift[]): ShiftActionTypes => {
    return {
        type: GET_SHIFTS,
        payload: posts
    };
};