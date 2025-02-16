
import { NO } from "consts/consts";
import { useSelector } from "react-redux";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import ZoneSelector from "./ZoneSelector/ZoneSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnZone = ({ isEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const { list } = useCalculateFinalPrice();

    if (list.location === 0) return null
    return (
        <>
            {!isEdit ?
                <div className={styles.infoContainer_priceItem}>
                    {selectedRequest?.logisticSettings.travel.zoneCode?.name} <p>{list.location}<span>.00</span></p></div>
                : <ZoneSelector />}
        </>
    )
}

export default AddOnZone;