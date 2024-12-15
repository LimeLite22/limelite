import { CheckBox, CheckBoxSelected} from "assets/images";
import { OWN_SCRIPT } from "consts/consts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../../../redux/requests/reducer";

import styles from "../../../../NewRequest.module.scss";
interface IProps {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    isError: {
        text: boolean,
    },
}
const NoFormats = ({
    isExpanded, setIsExpanded, isError,
}: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const selection = selectedRequest?.voiceTrackSettings.scriptAuthor;
    const [textStatus, setTextStatus] = useState(0);
    const dispatch = useDispatch();
    const handleUpdateField = (path: string, value: string) => {
        dispatch(
            updateDraftField({
                path,
                value,
            })
        );
    };


    return <div
        className={`
    ${styles.box}
    ${selection === OWN_SCRIPT ? styles.box_selected : ""} `}
        onClick={() => {
            handleUpdateField("voiceTrackSettings.scriptAuthor", OWN_SCRIPT);
            setIsExpanded(true);
        }}
    >
        <div
            className={styles.box_header}
        >
            <img
                className={styles.box_circle}
                src={selection === OWN_SCRIPT ? CheckBoxSelected : CheckBox}
                alt="CheckBox"
            />
            <span className={styles.box_title}>
                No
            </span>
            <div className={styles.box_title2}>
                We don't need any additional formats of this video.
            </div>
        </div>
    </div >
        ;
};

export default NoFormats;