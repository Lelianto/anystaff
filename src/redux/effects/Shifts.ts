import { getShiftsAction } from '../actions/ShiftActions';
import { Dispatch } from 'redux';
import { ShiftActionTypes } from '../types/ShiftTypes';
export const getShifts = () => {
    return function (dispatch: Dispatch<ShiftActionTypes>) {
        const POST_URL = 'http://localhost:9000/api';
        fetch(POST_URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                dispatch(getShiftsAction(data));
                return data;
            });
    };
};