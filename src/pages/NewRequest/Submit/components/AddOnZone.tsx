
import { NO } from "consts/consts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateAddOnLocation } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import ZoneSelector from "./ZoneSelector/ZoneSelector";
interface IProps {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const AddOnZone = ({ isEdit, setIsEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const [current, setCurrent] = useState(selectedRequest?.logisticSettings.location);
    const dispatch = useDispatch();

    useEffect(() => {
        current && dispatch(updateAddOnLocation(current))
    }, [])
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