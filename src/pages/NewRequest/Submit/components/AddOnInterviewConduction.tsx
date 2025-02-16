
import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";
import InterviewConductionSelector from "./InterviewConductionSelector/InterviewConductionSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnInterviewConduction = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();

    if (list.virtualInterview + list.virtualQuestion === 0) return null
    return (
        <>
            <>
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Interview conduction <p>{list.virtualQuestion || list.virtualInterview}<span>.00</span></p></div>

                    : <InterviewConductionSelector />}
            </>
        </>
    )
}

export default AddOnInterviewConduction;