import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";
import InterviewQuestionsSelector from "./InterviewAuthorSelector/InterviewQuestionsSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnInterviewQuestions = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();

    if (list.professionalQuestionWriter === 0) return null

    return (
        <>
            <>
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Interview questions <p>{list.professionalQuestionWriter}<span>.00</span></p></div>

                    : <InterviewQuestionsSelector />}
            </>
        </>
    )
}

export default AddOnInterviewQuestions;