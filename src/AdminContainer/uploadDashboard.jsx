import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { addCarouselData, updateCarouselData, deleteSwapCarouselData } from './actions';

import CustomDialog from '../customComponents/CustomDialog';
import CustomButton from '../customComponents/CustomButton';
import InputField from '../customComponents/InputField';
import CustomFileUpload from '../customComponents/customFileUpload';

function UploadDashBoard(props) {

    const dialogStyles = makeStyles(() => ({
        paperFullScreen: {
            background: "green",
            borderRadius: 0,
        }
    }));

    const classes = dialogStyles();

    const [isDialogOpen, setDialogOpen] = React.useState(false);

    const [file, setFile] = React.useState('');

    const [inputFields, setState] = React.useState({});

    const [showMoreOptions, setShowMore] = React.useState({});

    const [shuffleOptions, setShuffleOptions] = React.useState({});

    const addNewSection = (sectionName) => {
        return (
            <>
                <div className='adm-add-new'
                    onClick={() => setDialogOpen(!isDialogOpen)}
                >
                    <div>+</div>
                    <span>{`Add new ${sectionName}`}</span>
                </div>
            </>
        );
    };

    const submitData = () => {
        const data = {
            ...inputFields,
            file,
        }
        if (sessionStorage.getItem("mode") === "edit") {
            typeof data.file === "string" && delete data.file;
            data["img_id"] = sessionStorage.getItem("img_id");
            props.updateCarouselData(data);
        } else {
            props.addCarouselData(data);
        }
        setDialogOpen(false);
        sessionStorage.removeItem("mode");
    }


    const actions = () => {
        return (
            <>
                <CustomButton
                    style={{ padding: '12px 18px' }}
                    label={'cancel'}
                    onClick={() => {
                        sessionStorage.removeItem("mode");
                        setDialogOpen(false)
                    }}
                />
                <CustomButton
                    style={{ padding: '12px 18px', marginLeft: 20 }}
                    label={sessionStorage.getItem("mode") === "edit" ? 'Update' : 'Submit'}
                    isPrimary={true}
                    onClick={submitData}
                />
            </>
        );
    };

    const handleInputChange = (event) => {
        setState({ ...inputFields, [event.target.name]: event.target.value });
    }

    const getFiles = (file) => {
        setFile(file);
    }

    const dialogBody = () => (
        <div className="uploadDashboard--body">
            <div>
                <InputField
                    name='title'
                    label='Title'
                    hintText='Enter the title'
                    value={inputFields.title || ""}
                    onChange={handleInputChange}
                />
                <InputField
                    name='desc'
                    label='Description'
                    hintText='Enter description (Max 300 characters)'
                    value={inputFields.desc || ""}
                    onChange={handleInputChange}
                />
            </div>
            <CustomFileUpload
                id="file"
                text="Choose file to upload"
                image="/images/image-attach-icon.svg"
                getFiles={getFiles}
                fileUrl={file}
                parentStyle={{ background: "#fafaff" }}
            />
        </div>
    );

    const showMoreOption = (event, id) => {
        setShowMore({ ...showMoreOptions, [id]: !showMoreOptions[id] });
    }

    const handleEdit = (data) => {
        sessionStorage.setItem("mode", "edit");
        sessionStorage.setItem("img_id", data.id);
        setFile(data.img_s3_url);
        setState({
            title: data.title,
            desc: data.description,
        });
        setDialogOpen(true);
        setShowMore({ ...showMoreOptions, [data.id]: !showMoreOptions[data.id] });
    }

    const handleDelete = (data) => {
        const query = {
            action: "delete",
            img_id1: data.id
        }
        props.deleteSwapCarouselData(query);
        setShowMore({ ...showMoreOptions, [data.id]: !showMoreOptions[data.id] });
    }

    const handleShuffle = (id) => {
        setShuffleOptions({ ...shuffleOptions, [id]: !shuffleOptions[id] });
    }

    const shuffle = (id1, id2) => {
        const query = {
            action: 'swap',
            img_id1: id1,
            img_id2: id2
        };
        props.deleteSwapCarouselData(query);
    }

    const imagesIDs = props.containerData.map(data => data.id).sort((a, b) => a - b);

    return (
        <>
            <div className="uplDashboard--container">
                {props.containerData.map(data =>
                    <div className="view--wrapper" key={`${data.id}`}>
                        <div>
                            <div id="topBar">
                                <div id='topBar' style={{ position: "relative" }} onClick={() => handleShuffle(data.id)} >
                                    image {data.id}
                                    <KeyboardArrowDownIcon
                                        className="transition"
                                        style={false ? { transform: "rotate(90deg)" } : {}}
                                    />
                                    <ul className={shuffleOptions[data.id] ? "showMore open" : "showMore"}>
                                        {imagesIDs.map(id => {
                                            if (id !== data.id)
                                            return <li key={`${id}`} onClick={(event) => shuffle(data.id, id)}>Image {id}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div style={{ position: "relative" }}>
                                <MoreHorizIcon
                                    onClick={(event) => showMoreOption(event, data.id)}
                                />
                                <ul className={showMoreOptions[data.id] ? "showMore open" : "showMore"}>
                                    <li onClick={() => handleEdit(data)}>Edit</li>
                                    <li onClick={() => handleDelete(data)}>Delete</li>
                                </ul>
                            </div>
                        </div>
                        <div id="img">
                            <img src={data.img_s3_url} alt="dashboard_image" />
                        </div>
                        <label>{data.title}</label>
                        <p>{data.description}</p>
                    </div>
                )}
                <div>{addNewSection('dashboard image')}</div>
            </div>
            <CustomDialog
                open={isDialogOpen}
                // className={classes.paperFullScreen} // not working as expected.
                headerStyle={{ boxShadow: "0 1px 3px 0 rgba(17, 14, 52, 0.1)" }}
                fullScreen={true}
                handleClose={() => setDialogOpen(false)}
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
    const { containerData } = state.AdminReducer;
    return { containerData };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addCarouselData,
        updateCarouselData,
        deleteSwapCarouselData
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadDashBoard);