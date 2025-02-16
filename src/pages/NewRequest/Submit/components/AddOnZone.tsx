
import { NO } from "consts/consts";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import ZoneSelector from "./ZoneSelector/ZoneSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnZone = ({ isEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null

    if (selectedRequest?.logisticSettings.travel.selection === NO) return null
    return (
        <>
            {!isEdit ?
                <div className={styles.infoContainer_priceItem}>
                    {selectedRequest?.logisticSettings.travel.zoneCode?.name} <p>{selectedRequest?.logisticSettings.travel.zoneCode?.value}<span>.00</span></p></div>
                : <ZoneSelector />}
        </>
    )
}

export default AddOnZone;