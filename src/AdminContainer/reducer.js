import {
    SET_NAVIGATION_DATA,
    SET_CONTAINER_DATA,
    SET_FILTER_DATA,
    SET_POINTS,
    SET_PREVIEW_POINTS,
    GET_REWARD_COL,
    GET_REWARD_COL_SUCCESS,
    PREVIEW_POINTS,
    PREVIEW_REWARDS,
    PREVIEW_SUCCESS,
    CHANGE_FILE
} from './actions';

const initialState = {
    navigationData: [],
    containerData: [],
    tableHelpers: {},
    pointsData: [],
    previewPointsData: {},

    rewardCol: [],
    rewardData: [],
    previewRewardData: [],
    dataLoading: true,

    previewLoad: false,
    previewCol: [],
    previewData: []
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

        case GET_REWARD_COL: 
        return {
            ...state,
            dataLoading: true
        }

        case GET_REWARD_COL_SUCCESS:
            return {
                ...state,
                dataLoading: false,
                rewardCol: action.payload.tabHeaders,
                rewardData: action.payload.tabData
            }
        
        case PREVIEW_REWARDS:
            return {
                ...state,
                previewLoad: true
            };
        
        case PREVIEW_SUCCESS: 
            return {
                ...state,
                previewLoad: true,
                previewCol: action.payload.tabHeaders,
                previewData: action.payload.tabData
            }
        case CHANGE_FILE:
            return {
                ...state,
                previewLoad: false
            }
        default: return state;
    }
}

export default AdminReducer;