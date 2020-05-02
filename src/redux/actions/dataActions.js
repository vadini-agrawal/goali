import { SET_UPDATES, SET_UPDATE, POST_UPDATE, LOADING_DATA, LIKE_UPDATE, UNLIKE_UPDATE, DELETE_UPDATE, LOADING_UI, CLEAR_ERRORS, SET_ERRORS, STOP_LOADING_UI, SUBMIT_COMMENT} from '../types';
import axios from 'axios';

//Get all updates 
export const getUpdates = () => (dispatch) => {
    dispatch({ type: LOADING_DATA});
    axios.get(`/updates`)
        .then(res => {
            dispatch({
                type: SET_UPDATES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_UPDATES,
                payload: []
            })
        })
}

//Post update
export const postUpdate = (newUpdate) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post('/update', newUpdate)
        .then((res) => {
            dispatch({ 
                type: POST_UPDATE,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

//Like an update 
export const likeUpdate = (updateId) => dispatch => {
    axios.get(`/update/${updateId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_UPDATE,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

//Unlike an update 
export const unlikeUpdate = (updateId) => dispatch => {
    axios.get(`/update/${updateId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_UPDATE,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const submitComment = (updateId, newComment) => dispatch => {
    axios.post(`/update/${updateId}/comment`, newComment)
        .then((res) => {
            dispatch({ 
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getUpdate = (updateId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/update/${updateId}`)
        .then(res => {
            dispatch({ 
                type: SET_UPDATE,
                payload: res.data 
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch( err => {
            console.log(err);
        });
}

export const deleteUpdate = (updateId) => dispatch => {
    axios.delete(`/update/${updateId}`)
        .then(() => {
            dispatch({ 
                type: DELETE_UPDATE,
                payload: updateId
            })
        })
        .catch(err => console.log(err));
}



export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}