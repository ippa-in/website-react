import React from "react";
import PropTypes from "prop-types";

// Import css files
import "./customFileUpload.scss";

// import 3rd party libraries
import { setOptions, Document, Page } from "react-pdf";

// const pdfjsVersion = "2.0.305";
// setOptions({
//     workerSrc: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.js`,
// });

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

// fileChangeCallback = (files, type) => {
//     document.getElementById("drop_zone").value = "";
//     if (type === "upload") {
//         const fileDataList = [];
//         for (let i = 0; i < files.length; i++) {
//             const data = new FormData();
//             data.append("file_list", files[i]);
//             data.append("unique_id", files[i].name);
//             fileDataList.push({
//                 fileData: data,
//             });
//         }
//         this.props.uploadFiles({
//             fileDataList,
//             ef: this.props.ef,
//             isOcr: false,
//         });
//     }
//     this.props.getFiles(files);
// };

// deleteAttachement = index => {
//     const { ef, efRM, setExtraFieldRunningMap } = this.props;

//     const updatedList = [...efRM[ef.ct_id][ef.field_id]].filter(
//         (url, key) => key !== index,
//     );
//     setExtraFieldRunningMap(
//         updatedList.length > 0 ? updatedList : "",
//         ef.field_id,
//         ef.ct_id,
//     );
// };

const attachmentUIHelperFunction = (
    component,
    file,
    index,
    // fileType,
    // totalPages = 1,
) => (
        <div
            className="uploadedFile--container"
            key={`${index}-${file.name ? file.name : file}`}
        >
            <div className="file-parent">
                {component}
                <div className="deleteIcon">
                    {/* eslint-disable-next-line */}
                    <img
                        style={{ cursor: "pointer", width: 12 }}
                        src="./assets/images/close-cross.svg"
                        onClick={() => this.deleteAttachement(index)}
                    />
                </div>
            </div>
            {/* <div className='uploadedFile--info'>
                <span className='fileName'>{file.name}</span>
                <span>{totalPages} page{totalPages > 1 ? 's' : ''} | {this.returnFileSize(file.size)}</span>
            </div> */}
        </div>
    );

const renderImage = (file, index) =>
    this.attachmentUIHelperFunction(
        <img src={file} className="uploadedFile" alt="Uploaded File" />,
        file,
        index,
    );

const onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ totalPages: numPages });
};

const renderPdf = (file, index) => {
    return (
        <Document
            key={`${index}-${file}`}
            file={file}
            onLoadSuccess={this.onDocumentLoadSuccess}
            loading="loading!"
        >
            <Page className="uploadedFile" pageNumber={1} />
        </Document>
    );
}

const renderUploadedAttachements = (files) => {
    const allFilesUI = [];

    console.log("files", files);

    files.forEach((url, index) => {
        if (url.includes("pdf")) {
            allFilesUI.push(
                this.attachmentUIHelperFunction(
                    this.renderPdf(url, index),
                    url,
                    index,
                    this.state.totalPages,
                ),
            );
        } else allFilesUI.push(this.renderImage(url, index));
    });
    return allFilesUI;
}

const returnFileSize = (number) => {
    if (number < 1024) {
        return `${number}bytes`;
    }
    if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(2)} KB`;
    }
    if (number >= 1048576) {
        return `${(number / 1048576).toFixed(2)} MB`;
    }
    return "--";
}

const validFileType = (fileList) => {
    const { fileTypes } = this.props;
    const validFileList = [];
    fileList.forEach(file => {
        if (file.size / (1024 * 1024) > 15) {
            console.log("Maximum allowed size for file upload is 15MB");
        } else {
            let flag = true;
            for (let i = 0; i < fileTypes.length; i++) {
                if (file.type.includes(fileTypes[i])) {
                    validFileList.push(file);
                    flag = false;
                }
            }

            if (flag) {
                console.log("Not valid file type!");
            }
        }
    });
    return validFileList;
}

const handleFileUpload = (event, files, setState) => {
    // let newFiles = document.getElementById('drop_zone').files;
    const newFiles = event.target.files || {};
    if (Object.values(newFiles).length) {
        let tempFiles = [...files];
        // if (!this.props.multiple) {
            // tempFiles = [...Object.values(newFiles)];
        // } else {
            tempFiles.push(...Object.values(newFiles));
        // }
        // tempFiles = validFileType(tempFiles);
        setState(
            {
                files: tempFiles,
            },
            // () => fileChangeCallback(this.state.files, "upload"),
        );
    }
}

const handleDrop = (event, setState) => {
    event.stopPropagation();
    setState({
        dragOverLay: false,
    });
};

const handleDragEnter = (event, dragOverLay, setState) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
    !dragOverLay &&
        setState({
            dragOverLay: true,
        });
};

const handleDragLeave = (event, dragOverLay, setState) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
    dragOverLay &&
        setState({
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

const CustomFileUpload = (props) => {
    const [state, setState] = React.useState({
        files: [],
        dragOverLay: false,
    });

    const { files, dragOverLay } = state;

    return files.length ? (
        <div className="fileUpload--wrapper uploaded">
            {renderUploadedAttachements(files)}
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
                    accept="image/*,.pdf"
                    multiple={false}
                    onChange={(event) => handleFileUpload(event, files, setState)}
                    onDrop={(event) => handleDrop(event, setState)}
                    onDragOver={(event) => handleDragEnter(event, dragOverLay, setState)}
                    onDragLeave={(event) => handleDragLeave(event, dragOverLay, setState)}
                />
            </div>
        );
}

CustomFileUpload.propTypes = {
    ctName: PropTypes.string,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    required: PropTypes.bool,
    fileTypes: PropTypes.array,
    getFiles: PropTypes.func,
    uploadFiles: PropTypes.func,
};

CustomFileUpload.defaultProps = {
    ctName: "",
    files: [],
    multiple: false,
    required: false,
    fileTypes: ["image", "pdf"],
    getFiles: () => { },
    uploadFiles: () => { },
};

export default CustomFileUpload;