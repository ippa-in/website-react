import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: true,
  couponLoading: true,
  rewardNetwork: null,
  userPoints: null,
  resStr: '',
  couponData: null,
  activeId: ''
}

const rewardReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_REWARD_INFO: 
    return {
      ...state,
      loading: true
    }
    case actionTypes.REWARD_SUCCESS:
      return {
        ...state,
        loading: false,
        rewardNetwork: action.resData.reward_networks,
        userPoints: action.resData.user_points,
        activeId: action.networkId
      }
    case actionTypes.REWARD_FAILURE:
      return {
        ...state,
        loading: false,
      }

    case actionTypes.GET_REWARD_COUPON:
      return {
        ...state,
        couponLoading: true
      }

    case actionTypes.GET_REWARD_COUPON_SUCCESS:
      return {
        ...state,
        couponLoading: false,
        activeId: action.netId,
        couponData: action.rewardData
      }

      case actionTypes.GET_REWARD_COUPON_SUCCESS:
        return {
          ...state,
          couponLoading: false
        }
    default: return state;
  }
}

export default rewardReducer;