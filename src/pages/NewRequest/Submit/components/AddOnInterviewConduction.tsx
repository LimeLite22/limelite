
import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";
import InterviewConductionSelector from "./InterviewConductionSelector/InterviewConductionSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnInterviewConduction = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


    return (
        <div>
            <div >
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Interview conduction <p>{list.virtualQuestion || list.virtualInterview}<span>.00</span></p></div>

                    : <InterviewConductionSelector />}
            </div>
        </div >
    )
}

export default AddOnInterviewConduction;