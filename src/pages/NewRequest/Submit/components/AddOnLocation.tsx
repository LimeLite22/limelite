
import { CloseRed, Success2 } from "assets/images";
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
    const [current, setCurrent] = useState(selectedRequest?.location);
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
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_text}>
                {isEdit ?
                    <div>Location({OWN_ADDRESS})</div> : <LocationSelector />}
            </div>
        </div >
    )
}

export default AddOnLocation;