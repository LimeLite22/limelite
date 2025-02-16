import { useCalculateFinalPrice } from "utils/priceCalculator";
import styles from "../../NewRequest.module.scss";
import ThumbnailSelector from "./ThumbnailSelector/ThumbnailSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnThumbnail = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


    return (
        <div>
            <div >
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Thumbnail <p>{list.customThumbnail || 0}<span>.00</span></p></div>

                    : <ThumbnailSelector />}
            </div>
        </div >
    )
}

export default AddOnThumbnail;