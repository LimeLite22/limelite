import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";
import InterviewQuestionsSelector from "./InterviewAuthorSelector/InterviewQuestionsSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnInterviewQuestions = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


    return (
        <div>
            <div >
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Interview questions <p>{list.professionalQuestionWriter}<span>.00</span></p></div>

                    : <InterviewQuestionsSelector />}
            </div>
        </div >
    )
}

export default AddOnInterviewQuestions;