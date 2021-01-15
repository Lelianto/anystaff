import { ShiftActionTypes } from '../types/ShiftTypes';
import { Shift, PostShift } from '../interfaces/Shift';

export const getShiftsAction = (posts: Shift[]): ShiftActionTypes => {
    return {
        type: 'GET_SHIFTS',
        payload: posts
    };
};

export const postShiftAction = (posts: PostShift[]): ShiftActionTypes => {
    return {
        type: 'POST_SHIFTS',
        payload: posts
    };
};

export const addCalendarData = (posts: PostShift[]): ShiftActionTypes => {
    return {
        type: 'ADD_CALENDAR_DATA',
        payload: posts
    };
};