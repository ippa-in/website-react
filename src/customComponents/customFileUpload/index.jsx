import React from "react";
import PropTypes from "prop-types";

// Import css files
import "./customFileUpload.scss";
import CloseIcon from '@material-ui/icons/Close';

class CustomFileUpload extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            file: props.fileUrl,
            dragOverLay: false,
        };
    }

    componentDidMount() {
        console.log("iahfsfk", this.props.fileUrl);
        const dropzoneId = "drop_zone";
        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            document.addEventListener(
                eventName,
                e => {
                    if (e.target.id !== dropzoneId) {
                        e.preventDefault();
                        e.dataTransfer.effectAllowed = "none";
                        e.dataTransfer.dropEffect = "none";
                    }
                },
                false,
            );
        });
    }

    componentWillUnmount() {
        console.log("unmounted");
        const dropzoneId = "drop_zone";
        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            document.removeEventListener(
                eventName,
                e => {
                    if (e.target.id !== dropzoneId) {
                        e.preventDefault();
                        e.dataTransfer.effectAllowed = "none";
                        e.dataTransfer.dropEffect = "none";
                    }
                },
                false,
            );
        });
    }

    handleFileUpload = (event) => {
        // let newFiles = document.getElementById('drop_zone').files;
        const newFiles = event.target.files || {};
        if (Object.values(newFiles).length) {
            const url = window.URL.createObjectURL(newFiles[0]);
            this.setState({ ...this.state, file: url });
            this.props.getFiles(newFiles[0], this.props.id);
        }
    }

    handleDrop = (event) => {
        event.stopPropagation();
        this.setState({
            dragOverLay: false,
        });
    };

    handleDragEnter = (event) => {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
        !this.state.dragOverLay &&
            this.setState({
                dragOverLay: true,
            });
    };

    handleDragLeave = (event) => {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
        this.state.dragOverLay &&
            this.setState({
                dragOverLay: false,
            });
    };

    getFileUploadClassName = (dragOverLay, highlightFileUploadError) => {
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

    deleteAttachement = () => {
        this.setState({ file: '' });
        this.props.getFiles('', this.props.id);
    };

    attachmentUIHelperFunction = (component) => (
        <div className="file-parent">
            {component}
            <div className="deleteIcon">
                <CloseIcon
                    style={{ cursor: 'pointer' }}
                    onClick={this.deleteAttachement}
                />
            </div>
        </div>
    );

    render() {
        const { file, dragOverLay } = this.state;
        const { parentStyle, image, text } = this.props;
        console.log("file", file);
        return (file.length ? (
            <div className="fileUpload--wrapper uploaded" style={parentStyle}>
                {this.attachmentUIHelperFunction(<img src={file} className="uploadedFile" alt="Uploaded File" />)}
            </div>
        ) : (
                <div
                    className={this.getFileUploadClassName(dragOverLay)}
                    style={parentStyle}
                >
                    {dragOverLay ? (
                        <div className="drop-here">Drop here</div>
                    ) : (
                            <div className="uploadFile">
                                <img
                                    src={image}
                                    alt="attach icon"
                                />
                                <div>{text}</div>
                            </div>
                        )}
                    <input
                        className="uploadFile--input"
                        type="file"
                        id="drop_zone"
                        accept="image/*"
                        multiple={false}
                        onChange={this.handleFileUpload}
                        onDrop={this.handleDrop}
                        onDragOver={this.handleDragEnter}
                        onDragLeave={this.handleDragLeave}
                    />
                </div>
            )
        )
    }
}

CustomFileUpload.propTypes = {
    fileUrl: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    required: PropTypes.bool,
    parentStyle: PropTypes.object,
    getFiles: PropTypes.func,
};

CustomFileUpload.defaultProps = {
    fileUrl: "",
    text: "Click here to attach",
    image: "/images/attach-icon.svg",
    required: false,
    parentStyle: {},
    getFiles: () => { },
};

export default CustomFileUpload;