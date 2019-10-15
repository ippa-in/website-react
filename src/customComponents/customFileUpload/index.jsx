import React from "react";
import PropTypes from "prop-types";

// Import css files
import "./customFileUpload.scss";
import CloseIcon from '@material-ui/icons/Close';

// componentDidMount() {
//     const dropzoneId = "drop_zone";
//     ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
//         document.addEventListener(
//             eventName,
//             e => {
//                 if (e.target.id !== dropzoneId) {
//                     e.preventDefault();
//                     e.dataTransfer.effectAllowed = "none";
//                     e.dataTransfer.dropEffect = "none";
//                 }
//             },
//             false,
//         );
//     });
// }

// componentWillUnmount() {
//     const dropzoneId = "drop_zone";
//     ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
//         document.removeEventListener(
//             eventName,
//             e => {
//                 if (e.target.id !== dropzoneId) {
//                     e.preventDefault();
//                     e.dataTransfer.effectAllowed = "none";
//                     e.dataTransfer.dropEffect = "none";
//                 }
//             },
//             false,
//         );
//     });
// }

const CustomFileUpload = (props) => {

    const [state, setState] = React.useState({
        file: props.fileUrl,
        dragOverLay: false,
    });

    const handleFileUpload = (event, props) => {
        // let newFiles = document.getElementById('drop_zone').files;
        const newFiles = event.target.files || {};
        if (Object.values(newFiles).length) {
            const data = new FormData();
            data.append(props.id, newFiles[0]);
            props.uploadFiles({ fileData: true, data });
            // this.props.getFiles(files);
        }
    }

    const handleDrop = (event, state, setState) => {
        event.stopPropagation();
        setState({
            ...state,
            dragOverLay: false,
        });
    };

    const handleDragEnter = (event, state, setState) => {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
        !state.dragOverLay &&
            setState({
                ...state,
                dragOverLay: true,
            });
    };

    const handleDragLeave = (event, state, setState) => {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
        state.dragOverLay &&
            setState({
                ...state,
                dragOverLay: false,
            });
    };

    const getFileUploadClassName = (dragOverLay, highlightFileUploadError) => {
        let className = "";
        if (dragOverLay) {
            className = "fileUpload--wrapper dropFile";
        } else {
            className = "fileUpload--wrapper";
        }
        if (highlightFileUploadError && !className.includes("dropFile")) {
            className = className.concat(" showError");
        }
        return className;
    };

    const deleteAttachement = () => {
        setState({ file: '' });
    };

    const attachmentUIHelperFunction = (component, file) => (
        <div className="file-parent">
            {component}
            <div className="deleteIcon">
                <CloseIcon
                    style={{ cursor: 'pointer' }}
                    onClick={deleteAttachement}
                />
            </div>
        </div>
    );

    const { file, dragOverLay } = state;

    return (file.length ? (
        <div className="fileUpload--wrapper uploaded">
            {attachmentUIHelperFunction(<img src={file} className="uploadedFile" alt="Uploaded File" />,
                file
            )}
        </div>
    ) : (
            <div
                className={getFileUploadClassName(dragOverLay)}
            >
                {dragOverLay ? (
                    <div className="drop-here">Drop here</div>
                ) : (
                        <div className="uploadFile">
                            <img
                                src="./images/attach-icon.svg"
                                alt="attach icon"
                            />
                            <div>Click here to attach</div>
                        </div>
                    )}
                <input
                    className="uploadFile--input"
                    type="file"
                    id="drop_zone"
                    accept="image/*"
                    multiple={false}
                    onChange={(event) => handleFileUpload(event, props)}
                    onDrop={(event) => handleDrop(event, state, setState)}
                    onDragOver={(event) => handleDragEnter(event, state, setState)}
                    onDragLeave={(event) => handleDragLeave(event, state, setState)}
                />
            </div>
        )
    )
}

CustomFileUpload.propTypes = {
    fileUrl: PropTypes.string,
    required: PropTypes.bool,
    getFiles: PropTypes.func,
    uploadFiles: PropTypes.func,
};

CustomFileUpload.defaultProps = {
    fileUrl: "",
    required: false,
    getFiles: () => { },
    uploadFiles: () => { },
};

export default CustomFileUpload;