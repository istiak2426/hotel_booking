import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadRooms = rooms => ({
    type: actionTypes.LOAD_ROOMS,
    payload: rooms
})

export const roomsLoading = () => ({
    type: actionTypes.ROOMS_LOADING
})

export const fetchRooms = () => dispatch => {
    dispatch(roomsLoading());

    const devEnv = process.env.NODE_ENV !== "production";
	const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

    axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/rooms`)
        .then(response => response.data)
        .then(rooms => dispatch(loadRooms(rooms)))
}