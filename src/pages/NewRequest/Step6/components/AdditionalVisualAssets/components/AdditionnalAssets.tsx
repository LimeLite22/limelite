import { Add2, CheckBox, CheckBoxSelected, Drop, Expand, Note } from "assets/images";
import { DEFAULT, PROFESSIONAL_SCRIPT } from "consts/consts";
import { useState } from "react";
import { FileDrop } from 'react-file-drop';
import { useDispatch, useSelector } from "react-redux";
import { generateUniqueId } from "utils/generateId";
import { selectRequestInfo, updateDraftField } from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";
interface IProps {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    isError: {
        subject: boolean,
        text: boolean,
        email: boolean,
        phone: boolean,
    },
}
const AdditionalAsset = ({ isExpanded, setIsExpanded }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const [file, setFile] = useState<File | null>(null);

    const selection = selectedRequest?.voiceTrackSettings.scriptAuthor;

    const dispatch = useDispatch();
    const handleUpdateField = (path: string, value: string) => {
        dispatch(
            updateDraftField({
                path,
                value,
            })
        );
    };

    const handleSelect = () => {
        handleUpdateField("voiceTrackSettings.scriptAuthor", PROFESSIONAL_SCRIPT)
        setIsExpanded(true);
    }
    const handleExpand = (e: any) => {
        handleUpdateField("voiceTrackSettings.scriptAuthor", PROFESSIONAL_SCRIPT)
        setIsExpanded(!isExpanded);
        e.stopPropagation();
        e.preventDefault();
    }

    return <div
        className={`
        ${styles.box}
        ${selection === PROFESSIONAL_SCRIPT ? styles.box_selected : ""} 
        ${isExpanded ? styles.box_expanded : ""}`}
        onClick={handleSelect}
    >
        <div
            className={styles.box_header}
        >
            <img
                className={styles.box_circle}
                src={selection === PROFESSIONAL_SCRIPT ? CheckBoxSelected : CheckBox}
                alt="CheckBox"
            />
            <span className={styles.box_title}>
                Yes
                <div className={styles.box_title_addOn}>Add-on</div>
            </span>
            <div className={styles.box_title2}>
                We would like to upload additional visual assets
            </div>
        </div>
        <div className={styles.box_container}>
            <div className={styles.box_drop_header} >Use the upload tool below to share high quality vector formatted logos,
                brand standards, typefaces, or images.</div>
            <div>
                <FileDrop
                    className={styles.box_drop}
                    // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                    // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                    // onFrameDrop={(event) => console.log('onFrameDrop', event)}
                    // onDragOver={(event) => console.log('onDragOver', event)}
                    // onDragLeave={(event) => console.log('onDragLeave', event)}
                    onDrop={(files, event) => {
                        console.log('onDrop', files, event);
                        if (files && files[0]) { setFile(files[0]) }
                    }}
                >
                    <img src={Drop} alt="Drop" />
                    <div className={styles.box_drop_text} >Drag & Drop or <span>Choose file </span>to upload</div>
                    <div className={styles.box_drop_text2}>AI, SVG or PNG </div>
                </FileDrop>
            </div>
            <div>or</div>
            <div>Import from URL</div>
            <div></div>
            {file && <div  className={styles.box_file}>
                {file.name}
            </div>}


        </div>
        <img
            onClick={(e) => handleExpand(e)}
            src={Expand}
            alt="Expand"
            className={styles.box_expand}
        />
    </div>;
};

export default AdditionalAsset;