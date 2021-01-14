import { Shift, PostShift } from '../interfaces/Shift';

export interface ShiftsStateType {
    shifts: Shift[];
    postShift: PostShift[],
    calendarData:any[]
}
export type ShiftActionTypes = { type: "GET_SHIFTS" | "POST_SHIFTS" | 'ADD_CALENDAR_DATA'; payload: any };
