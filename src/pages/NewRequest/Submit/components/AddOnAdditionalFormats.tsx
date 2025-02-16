import { useCalculateFinalPrice } from "utils/priceCalculator";
import styles from "../../NewRequest.module.scss";
import AdditionalFormatsSelector from "./AdditionalFormatsSelector/AdditionalFormatsSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnAdditionalFormats = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();

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