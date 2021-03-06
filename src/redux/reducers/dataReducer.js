import { SET_UPDATE, LIKE_UPDATE, UNLIKE_UPDATE, LOADING_DATA, SET_UPDATES, DELETE_UPDATE, POST_UPDATE, SUBMIT_COMMENT} from '../types';
import { bindActionCreators } from 'redux';

const initialState = {
    updates: [],
    update: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_DATA: 
            return {
                ...state, 
                loading: true
            };
        case SET_UPDATES:
            return {
                ...state, 
                loading: false,
                updates: action.payload
            };
        case SET_UPDATE:
            return {
                ...state, 
                loading: false, 
                update: action.payload
            };
        case LIKE_UPDATE:
        case UNLIKE_UPDATE:
            let index = state.updates.findIndex((update) => update.updateId === action.payload.updateId);
            state.updates[index] = action.payload
            if (state.update.updateId === action.payload.updateId) {
                state.update = action.payload;
            }
            return {
                ...state,
            };
        case DELETE_UPDATE: 
            let delIndex = state.updates.findIndex(update => update.updateId === action.payload);
            state.updates.splice(delIndex, 1);
            return {
                ...state
            };
        case POST_UPDATE:
            return {
                ...state,
                updates: [
                    action.payload,
                    ...state.updates
                ]
            };
        case SUBMIT_COMMENT:
            let commIndex = state.updates.findIndex((update) => update.updateId === action.payload.updateId);
            state.updates[commIndex].commentCount = action.payload.commentCount
            return {
                ...state,
                update: {
                    ...state.update,
                    commentCount: action.payload.commentCount,
                    comments: [action.payload, ...state.update.comments]
                }
            };
        default: 
            return state;
    }
}