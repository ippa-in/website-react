import {
    SET_NAVIGATION_DATA,
    SET_CONTAINER_DATA,
    SET_FILTER_DATA,
    SET_POINTS,
    SET_PREVIEW_POINTS
} from './actions';

const initialState = {
    navigationData: [],
    containerData: [],
    tableHelpers: {},
    pointsData: [],
    previewPointsData: {},
}

const AdminReducer = (state = initialState, action) => {
    switch(action.type) {

        case SET_NAVIGATION_DATA: {
            return {
                ...state,
                navigationData: action.payload
            }
        }
        case SET_CONTAINER_DATA: {
            return {
                ...state,
                containerData: action.payload
            }
        }
        case SET_FILTER_DATA: {
            return {
                ...state,
                tableHelpers: action.payload
            }
        }
        case SET_POINTS: {
            return {
                ...state,
                pointsData: action.payload
            }
        }
        case SET_PREVIEW_POINTS: {
            return {
                ...state,
                previewPointsData: action.payload
            }
        }
        default: return state;
    }
}

export default AdminReducer;