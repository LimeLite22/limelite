import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";
import AdditionalFormatsSelector from "./AdditionalFormatsSelector/AdditionalFormatsSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnAdditionalFormats = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();

    if (list.videoFormats === 0) return null

    return (
        <>
            <>
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Additional/social formats <p>{list.videoFormats || 0}<span>.00</span></p></div>
                    : <AdditionalFormatsSelector />}
            </>
        </>
    )
}

export default AddOnAdditionalFormats;