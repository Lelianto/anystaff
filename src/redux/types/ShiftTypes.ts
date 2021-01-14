import { Shift, PostShift } from '../interfaces/Shift';

export interface ShiftsStateType {
    shifts: Shift[];
    postShift: PostShift[]
}
export type ShiftActionTypes = { type: "GET_SHIFTS" | "POST_SHIFTS"; payload: any };
