import { Shift } from '../interfaces/Shift';

export const GET_SHIFTS = 'GET_SHIFTS';

export interface GetShiftsStateType {
    shifts: Shift[];
}

interface GetShiftsActionType {
    type: typeof GET_SHIFTS;
    payload: Shift[];
}
export type ShiftActionTypes = GetShiftsActionType;