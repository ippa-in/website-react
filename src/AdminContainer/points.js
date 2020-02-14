import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import CustomDialog from '../customComponents/CustomDialog';
import CustomButton from '../customComponents/CustomButton';
import CustomFileUpload from '../customComponents/customFileUpload';
import CustomTable from '../customComponents/customTable';

import { getPoints, previewPoints, setPreviewPoints, submitPoints } from './actions';

function Points(props) {

    const [open, setOpen] = React.useState({});

    const fileUploadHelpTextStyle = {
        fontSize: 14,
        fontWeight: 500,
        color: '#9aa2b1',
        marginTop: 12,
    };

    const [file, setFile] = React.useState('');

    const submitData = () => {
        props.togglePointsDialog(false);
        props.submitPoints({ title: file.name, file });
    }

    const closeDialog = () => {
        props.togglePointsDialog(false);
        props.setPreviewPoints({});
        setFile('');
    }

    const actions = () => {
        return (
            <>
                <CustomButton
                    style={{ padding: '12px 18px' }}
                    label={'cancel'}
                    onClick={closeDialog}
                />
                <CustomButton
                    style={{ padding: '12px 18px', marginLeft: 20 }}
                    label='Submit'
                    isPrimary={true}
                    onClick={submitData}
                />
            </>
        );
    };

    const getPointsFromFile = (file) => {
        setFile(file);
        if (typeof file === 'object') {
            props.previewPoints({ title: file.name, file });
        }
    }

    const dialogBody = () => (
        <div className="uploadPoints--container"
            style={Object.keys(props.previewPointsData).length ? { padding: 18 } : {}}>
            {Object.keys(props.previewPointsData).length ?
                <>
                    <div className='previewPoints--helpers'>
                        <img src='/images/status/Verified.svg' alt='uploaded' />
                        <label>{props.previewPointsData.title}</label>
                        <CustomButton
                            style={{ padding: '12px 18px' }}
                            label='Change File'
                            onClick={() => {
                                props.setPreviewPoints({});
                                setFile('');
                            }}
                        />
                    </div>
                    <CustomTable
                        headers={props.columns}
                        tableData={props.previewPointsData.data || []}
                    />
                </>
                : <CustomFileUpload
                    id="file"
                    text={<>Choose file to upload<div style={fileUploadHelpTextStyle}>Upload any CSV, XLS, or XLSX files.</div></>}
                    image="/images/image-attach-icon.svg"
                    fileTypes=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    getFiles={getPointsFromFile}
                    fileUrl={file}
                    parentStyle={{ background: "#fafaff" }}
                />}
        </div>
    );

    const togglePointsSection = (index, id) => {
        props.getPoints({ point_file_id: id });
        setOpen({ ...open, [index]: !open[index] })
    }
    return (
        <>
            {props.containerData.map((data, index) =>
                <div className='points--container' key={`${data.file_id}`}>
                    <div
                        key={`${data.file_id}`}
                        className={open[index] ? "points--Wrapper" : "points--Wrapper"}
                        onClick={() => togglePointsSection(index, data.file_id)}
                    >
                        <div>
                            <span>{data.total_records} Users</span>
                            <span>{data.created_on}</span>
                        </div>
                        <div>
                            <span>{data.title}</span>
                            <ChevronRightIcon
                                className="transition"
                                style={open[index] ? { transform: "rotate(90deg)" } : {}}
                            />
                        </div>
                    </div>
                    {props.pointsData.length > 0 && open[index] && <CustomTable
                        headers={props.columns}
                        tableData={props.pointsData}
                    />}
                </div>
            )}
            <CustomDialog
                open={props.openPointsDialog}
                // className={classes.paperFullScreen} // not working as expected.
                headerStyle={{ boxShadow: "0 1px 3px 0 rgba(17, 14, 52, 0.1)" }}
                fullScreen={true}
                handleClose={closeDialog}
                title='Add Dashboard Image'
                dialogBody={dialogBody()}
                dialogStyle={{ minWidth: 520 }}
                actionsStyle={{
                    boxShadow: "0px -3px 3px 0 rgba(17, 14, 52, 0.1)",
                    padding: 14,
                }}
                actions={actions()}
            />
        </>
    );
}

function mapStateToProps(state) {
    const { tableHelpers, containerData, pointsData, previewPointsData } = state.AdminReducer;
    const columns = tableHelpers.colums || [];
    return { containerData, pointsData, columns, previewPointsData };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPoints,
        previewPoints,
        setPreviewPoints,
        submitPoints,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Points);
