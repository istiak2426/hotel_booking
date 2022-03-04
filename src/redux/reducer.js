import * as actionTypes from './actionTypes';

const initialState = {
    rooms: [],
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
}

export const Reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.ROOMS_LOADING:
            return {
                ...state,
                rooms: [],
            }
        case actionTypes.LOAD_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }

        //Auth Cases
        case actionTypes.AUTH_SUCCESS:
            return {
                token: action.payload.token,
                userId: action.payload.userId,
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                authFailedMsg: null,
                token: null,
                userId: null,
            }

            case actionTypes.AUTH_LOADING:
                return {
                    ...state,
                    authLoading: action.payload,
                    }
                    
             case actionTypes.AUTH_FAILED:
                    return {
                    ...state,
                    authFailedMsg: action.payload,
                    }
            default:
            return state;
    }
}



