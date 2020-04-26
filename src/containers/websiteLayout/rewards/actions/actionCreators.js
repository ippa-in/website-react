import * as actionTypes from './actionTypes';

export const getRewardsInfo = () => {
  return {
    type: actionTypes.GET_REWARD_INFO
  }
}

export const rewardsSuccess = (data, netId) => {
  return {
    type: actionTypes.REWARD_SUCCESS,
    resData: data,
    networkId: netId
  }
}

export const rewardsFailure = () => {
  return {
    type: actionTypes.REWARD_FAILURE
  }
}

export const rewardsCoupon = id => {
  return {
    type: actionTypes.GET_REWARD_COUPON,
    id
  }
}

export const rewardsCouponSuccess = (data, netId) => {
  return {
    type: actionTypes.GET_REWARD_COUPON_SUCCESS,
    rewardData: data,
    netId
  }
}

export const rewardsCouponFailure = () => {
  return {
    type: actionTypes.GET_REWARD_COUPON_FAILURE
  }
}

export const redeemRewards = (nId, rId) => {
  return {
    type: actionTypes.REDEEM_REWARDS,
    netId: nId,
    reward_id: rId
  }
}