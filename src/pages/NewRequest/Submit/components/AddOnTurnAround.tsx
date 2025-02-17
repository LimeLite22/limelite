
import { DEFAULT, NO } from "consts/consts";
import { useSelector } from "react-redux";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import TurnAroundSelector from "./TurnAroundSelector/TurnAroundSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnTurnAround = ({ isEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const { list } = useCalculateFinalPrice();

    if (list.turnAround === 0) return null
    return (
        <>
            {!isEdit ?
                <div className={styles.infoContainer_priceItem}>
                    Turn around <p>{list.turnAround}<span>.00</span></p></div>
                : <TurnAroundSelector />}
        </>
    )
}

export default AddOnTurnAround;