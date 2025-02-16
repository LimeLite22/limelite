import { useSelector } from "react-redux";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import LocationSelector from "./LocationSelector/LocationSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnLocation = ({ isEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const { list } = useCalculateFinalPrice();
    const price = list.locationType2 || list.locationType3 || 0;
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


    return (
        <div>
            <div >
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Location({selectedRequest?.logisticSettings.location.type}) <p>{price}<span>.00</span></p></div>
                    : <LocationSelector />}
            </div>
        </div >
    )
}

export default AddOnLocation;