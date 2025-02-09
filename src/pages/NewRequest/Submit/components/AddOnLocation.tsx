
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateAddOnLocation } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import { OWN_ADDRESS } from "consts/consts";
import LocationSelector from "./LocationSelector/LocationSelector";
interface IProps {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const AddOnLocation = ({ isEdit, setIsEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const [current, setCurrent] = useState(selectedRequest?.logisticSettings.location);
    const [isReady, setIsReady] = useState(false);


    const dispatch = useDispatch();

    const readyToSave = () => {
        let ready = true;
        if (55) {


        } else {
            ready = false
        }
        setIsReady(ready);
    }
    useEffect(() => {
        readyToSave();
    }, [current])
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
                        Location({selectedRequest?.logisticSettings.location.type}) <p>695<span>.00</span></p></div>

                    : <LocationSelector />}
            </div>
        </div >
    )
}

export default AddOnLocation;