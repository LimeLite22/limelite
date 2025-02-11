
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateAddOnLocation } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import InterviewQuestionsSelector from "./InterviewAuthorSelector/InterviewQuestionsSelector";
import ScriptSelector from "./ScriptSelector/ScriptSelector";
interface IProps {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const AddOnInterviewQuestions = ({ isEdit, setIsEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const [current, setCurrent] = useState(selectedRequest?.logisticSettings.location);
    const dispatch = useDispatch();

    useEffect(() => {
        current && dispatch(updateAddOnLocation(current))
    }, [])
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


    return (
        <div>
            <div >
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Interview questions <p>695<span>.00</span></p></div>

                    : <InterviewQuestionsSelector />}
            </div>
        </div >
    )
}

export default AddOnInterviewQuestions;