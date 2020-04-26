import React, { Component }  from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import './rewards.scss';

import * as actions from './actions/actionCreators'

class Rewards extends Component {
  componentDidMount () {
    this.props.getRewardsInfo();
  }

  networkTabClick = (e, id) => {
    e.preventDefault();
    if(e.currentTarget.classList.contains('active')) return false;
    this.props.getRewardCoupon(id);
  }

  redeemRewardsHandler = (e) => {
    e.preventDefault();
    console.log("parent");
    let rId = e.currentTarget.getAttribute('data-rewardid');
    this.props.redeemRewards(this.props.activeId, rId);
  }

  render () {
    let loadEle = <div className="ippa_loader">Loading...</div>
    console.log("Rewards", this.props.rewardsNetwork, this.props.couponData);
    return (
      <>
        <section className="ippa__intro">
          <h2 className="ippa__intro-title">Rewards</h2>
          <p className="ippa__intro-desc">Find here all the information about shows, artists but also our activities.</p>
        </section>
        <section className="ippa__content no-padding">
          <div className="ippa__points-content">
            {this.props.loading ? loadEle : <PointCard pointsList={this.props.userPoints} />}
          </div>
          <div className="rewards__tab-container">
            {this.props.loading ? loadEle : <NetworkTabs activeId={this.props.activeId} tabList={this.props.rewardsNetwork} tabClick={this.networkTabClick} />}
          </div>
          <div className="reward__coupon-container">
            {this.props.couponLoading ? loadEle : <RewardCards couponList={this.props.couponData} redeemClick={this.redeemRewardsHandler}/>}
          </div>
        </section>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    rewardsNetwork: state.RewardReducer.rewardNetwork,
    loading: state.RewardReducer.loading,
    userPoints: state.RewardReducer.userPoints,
    activeId: state.RewardReducer.activeId,
    couponData: state.RewardReducer.couponData,
    couponLoading: state.RewardReducer.couponLoading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getRewardsInfo: () => dispatch(actions.getRewardsInfo()),
    getRewardCoupon: (id) => dispatch(actions.rewardsCoupon(id)),
    redeemRewards: (nId, rId) => dispatch(actions.redeemRewards(nId, rId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);

class PointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelArr: {
        'monthly_points': 'Current Month\'s Point',
        'redeemable_points': 'Redeemable Points',
        'total_points': 'Lifetime Points'
      }
    }
  }
  render () {
    return (
      this.props.pointsList ?
      Object.keys(this.props.pointsList).map((key, i) => {
        return this.state.labelArr.hasOwnProperty(key) ? <div key={i} className="points__card">
        <span className="points__info-link">?</span>
        <div className="points__card-icon">
          <img src="/images/points-icon.svg" alt="Rewards" width="54"></img>
        </div>
        <div className="points__card-content">
          <h5 className="points__card-count">{this.props.pointsList[key]}</h5>
          <span className="points__card-type">{this.state.labelArr[key]}</span>
        </div>
      </div> : null 
      }): null
    )
  }
}

class NetworkTabs extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="reward__tab">
        <ul className="reward__tab-list">
          {this.props.tabList ? this.props.tabList.map((list, i) => {
            return (
              <li key={i} className="reward__tab-item">
                <a href="" className={`reward__tab-link ${list.network_id === this.props.activeId ? 'active' : null}`} onClick={(e) => this.props.tabClick(e, list.network_id)} title={list.name}>
                  {list.network_id === this.props.activeId ? <span className="reward__tab-check"><img src="/images/rewards/check-mark-button.svg" width="18"></img></span> : null}
                  <img src={list.image_url} alt={list.name} width="137"/>
                </a>
              </li>
            ) 
          }) : null }
        </ul>
      </div>
    );
  }
}

class RewardCards extends Component {
  constructor(props) {
    super(props);
  }

  getDateFormat = (dt) => {
    let dtFor = new Date(dt);
    return moment(dtFor).format('Do MMM YYYY');
  }

  render () {
    return (
      <div className="reward__content">
        {this.props.couponList.map((con, i) => {
          return (
            <div key={i} className="reward__card">
              <header className="reward__card-header">
                <h5 className="reward__header-title">{con.title}</h5>
              </header>
              <div className="reward__card-content">
                <div className="reward__card-logo">
                  <img src={con.network.image_url} alt="" width="150" />
                </div>
                <div className="reward__card-band">Points Earned: {con.goal_points}</div>
                <div className="reward__card-desc">
                  <p>{con.description}</p>
                </div>
                <div className="reward__card-req">
                  <div className="reward__req-content">
                    <h6 className="reward__req-title">Requirements to redeem</h6>
                    <p className="reward__req-info">IPPA points generated on PokerStars</p>
                    <span className="reward__req-dt">{this.getDateFormat(con.from_date)}</span> - <span className="reward__req-dt">{this.getDateFormat(con.to_date)}</span>
                  </div>
                </div>
                <p className="reward__card-more"><a href={con.more_info_link} className="reward__more-link">More Info</a></p>
              </div>
              <div className={`reward__card-divider ${con.is_redeemed ? 'reward__card-divider--redeem' : ''}`}>
              <span className="circle left"></span>
              <span className="circle right"></span>
                <div className="divider-1"></div>
                <div className="divider-2"></div>
              </div>
              <footer className={`reward__card-footer ${con.is_redeemed ? 'reward__card-footer--redeem' : ''}`}>
                <div className="reward__footer-content">
                  {!con.is_redeemed ? con.is_active ? <button className="btn ippa__btn btn-primary" data-rewardid={con.reward_id} onClick={this.props.redeemClick}>Redeem Now</button> : <button className="btn ippa__btn btn-primary" disabled="true">Redeem Now</button> :null }
                  {con.is_redeemed ? <div className="reward__redeem-succ">
                    <span className="redeem__icon"><img src="/images/rewards/success-icon.svg" width="40" /></span>
                    <p className="redeem__msg">You have successfully redeemed this voucher!</p>
                  </div> : null}
                </div>
              </footer>
            </div>
          );
        })}
      </div>
    )
  }
}