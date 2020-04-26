import React, { Component } from 'react';
import './rewards.scss';
import { connect } from 'react-redux';
import CustomDialog from '../customComponents/CustomDialog';
import CustomButton from '../customComponents/CustomButton';
import CustomFileUpload from '../customComponents/customFileUpload';
import CustomTable from '../customComponents/customTable';
import * as actions from './actions';

const fileUploadHelpTextStyle = {
  fontSize: 14,
  fontWeight: 500,
  color: '#9aa2b1',
  marginTop: 12,
};

class AdminRewards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: ''
    }
  }

  componentDidMount() {
    this.props.getTabData();
  }

  submitData = () => {
    const { file } = this.state;
    this.props.submitRewardFile({title: file.name, file});

    // this.props.toggleRewardDialog(false);
    // this.setState({setFile: ''});
    // this.props.changeFile();
    this.closeDialog();
  }

  closeDialog = () => {
    this.props.toggleRewardDialog(false);
    this.setState({setFile: ''});
    this.props.changeFile();
  }

  actions = () => {
    return (
      <>
          <CustomButton
              style={{ padding: '12px 18px' }}
              label={'cancel'}
              onClick={this.closeDialog}
          />
          {this.props.previewLoad ?
          <CustomButton
            style={{ padding: '12px 18px', marginLeft: 20 }}
            label='Submit'
            isPrimary={true}
            onClick={this.submitData}
          /> :
          <CustomButton
              style={{ padding: '12px 18px', marginLeft: 20 }}
              label='Submit'
              isPrimary={true}
              disabled="true"
          />
          }
      </>
    )
  }

  getRewardFile = (file) => {
    this.setState({file});
    if(typeof file === 'object') {
      this.props.previewRewards({title: file.name, file});
    }
  }

  fileChangeHandler = () => {
    this.props.changeFile();
  }

  dialogBody = () => {
    const {previewLoad, preTabCol, preTabData, fileName} =  this.props;
    console.log(preTabCol, preTabData, "Preview");
    return <div className="arewards__modal-content">
      { previewLoad ?
      <div className="arewards__modal-preview">
        <header className="arewards__preview-header">
          <label className="arewards__preview-filename">
            <img src='/images/status/Verified.svg' alt='uploaded' width="14" />
            {fileName}</label>
            <CustomButton
                style={{ padding: '12px 18px' }}
                label='Change File'
                onClick={this.fileChangeHandler}
            />
        </header>
        <div className="arewards__preview-content">
          <CustomTable headers={preTabCol} tableData={preTabData} />
        </div>
      </div> :
      <div className="arewards__modal-filearea">
        <CustomFileUpload
          id="arewards__file"
          text={<>Choose file to upload<div style={fileUploadHelpTextStyle}>Upload any CSV, XLS, or XLSX files.</div></>}
          image="/images/image-attach-icon.svg"
          fileTypes=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          getFiles={this.getRewardFile}
          fileUrl={this.state.file}
          parentStyle={{ background: "#fafaff" }}
        />
      </div>
     }
    </div>
  }

  render () {
    let { dataLoading, columns, tabData } = this.props;
    const loader = <div className="loader">Loading...</div>
    console.log("tab", columns, tabData);
    return (
      <>
      <div className="areward__content">
        <div className="areward__table-container">
          {dataLoading ? loader : 
            <CustomTable headers={columns} tableData={tabData}/>}
        </div>
      </div>
        <CustomDialog
          open={this.props.openRewardsDialog}
          headerStyle={{ boxShadow: "0 1px 3px 0 rgba(17, 14, 52, 0.1)" }}
          fullScreen={true}
          handleClose={this.closeDialog}
          title="Add Reward"
          dialogBody={this.dialogBody()}
          dialogStyle={{ minWidth: 520 }}
          actionsStyle={{ boxShadow: "0px -3px 3px 0 rgba(17, 14, 52, 0.1)",  padding: 14 }}
          actions={this.actions()}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.AdminReducer.dataLoading,
    columns: state.AdminReducer.rewardCol.colums || [],
    tabData: state.AdminReducer.rewardData || [],
    previewLoad: state.AdminReducer.previewLoad,
    preTabCol: state.AdminReducer.previewCol.colums || [],
    preTabData: state.AdminReducer.previewData.data || [],
    fileName: state.AdminReducer.previewData.title || ''
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTabData: () => dispatch(actions.getRewardCol()),
    previewRewards: (payload) => dispatch(actions.previewRewards(payload)),
    changeFile: () => dispatch(actions.changeFile()),
    submitRewardFile: (payload) => dispatch(actions.submitRewards(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminRewards);