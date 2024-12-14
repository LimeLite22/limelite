import { CheckBox, CheckBoxSelected } from "assets/images";
import { BASIC_THUMBNAIL, DEFAULT} from "consts/consts";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../../../redux/requests/reducer";

import styles from "../../../../NewRequest.module.scss";
const BasicThumbnail = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const selection = selectedRequest?.videoSettings.thumbnail;
    const handleUpdateField = (path: string, value: string | File | typeof DEFAULT) => {
        dispatch(
            updateDraftField({
                path,
                value,
            })
        );
    };


    const dispatch = useDispatch();

    return <div
        className={`
    ${styles.box}
    ${selection === BASIC_THUMBNAIL ? styles.box_selected : ""} `}
        onClick={() => {
            handleUpdateField("videoSettings.thumbnail", BASIC_THUMBNAIL);
        }}
    >
        <div
            className={styles.box_header}
        >
            <img
                className={styles.box_circle}
                src={selection === BASIC_THUMBNAIL ? CheckBoxSelected : CheckBox}
                alt="CheckBox"
            />
            <span className={styles.box_title}>
                Yes,a basic thumbnial
            </span>
            <div className={styles.box_title2} >
                Thank you, this video does require a basic thumbnail.
            </div>
        </div>
    </div >
        ;
};

export default BasicThumbnail;