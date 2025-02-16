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
    if (price === 0) return null
    return (
        <>
            <>
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Location({selectedRequest?.logisticSettings.location.type}) <p>{price}<span>.00</span></p></div>
                    : <LocationSelector />}
            </>
        </>
    )
}

export default AddOnLocation;