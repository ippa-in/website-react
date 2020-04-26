import { put, takeLatest, all, call } from  'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/actionCreators';

import * as Api from '../../../../utils/apiList';

function* fetchRewards() {
  try {
    let playerToken = '', playerId = '';
    playerId = localStorage.getItem('playerID') ? localStorage.getItem('playerID') : '';
    playerToken = localStorage.getItem('playerToken') ? localStorage.getItem('playerToken') : '';
    const getHeader = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'PLAYER-ID': playerId,
      'PLAYER-TOKEN': playerToken
    }
    const res = yield call(Api.rewardsInfo, getHeader);
    const initId = res.data.res_data.reward_networks[0].network_id;

    yield(put(actions.rewardsSuccess( res.data.res_data, initId )));
    yield fetchRewardCoupon({id: initId});
  } catch (err) {
    yield(put(actions.rewardsFailure()));
  }
}

function* fetchRewardCoupon(action) {
  try {
    let rewardId = {'network_id' :action.id};
    const res = yield call(Api.rewardsCoupon, rewardId);
    console.log(res, "rewards");
    yield(put(actions.rewardsCouponSuccess(res.data.res_data, action.id)))
  } catch (err) {
    console.log(err);
  }
}

function* redeemRewHandler(action) {
  try {
    console.log("Clicker");
    let playerId = localStorage.getItem('playerID') ? localStorage.getItem('playerID') : '',
      headerData = {
        'reward_id': action.reward_id,
        'player_id': playerId
      };
      yield call(Api.redeemRew, headerData);
      yield fetchRewardCoupon({ id: action.netId })
  } catch (err) {
    console.log(err);
  }
}

export default function* rewardWatcher() {
  yield takeLatest(actionTypes.GET_REWARD_INFO, fetchRewards);
  yield takeLatest(actionTypes.GET_REWARD_COUPON, fetchRewardCoupon);
  yield takeLatest(actionTypes.REDEEM_REWARDS, redeemRewHandler)
}