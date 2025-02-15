
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import { selectRequestInfo, updateAddOnLocation } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import AdditionalFormatsSelector from "./AdditionalFormatsSelector/AdditionalFormatsSelector";
import ScriptSelector from "./ScriptSelector/ScriptSelector";
import ThumbnailSelector from "./ThumbnailSelector/ThumbnailSelector";
interface IProps {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const AddOnAdditionalFormats = ({ isEdit, setIsEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const [current, setCurrent] = useState(selectedRequest?.logisticSettings.location);
    const { list } = useCalculateFinalPrice();
    const dispatch = useDispatch();

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
                        Additional/social formats <p>{list.videoFormats || 0}<span>.00</span></p></div>
                    : <AdditionalFormatsSelector />}
            </div>
        </div >
    )
}

export default AddOnAdditionalFormats;