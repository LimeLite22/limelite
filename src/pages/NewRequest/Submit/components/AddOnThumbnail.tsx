import { useCalculateFinalPrice } from "utils/priceCalculator";
import styles from "../../NewRequest.module.scss";
import ThumbnailSelector from "./ThumbnailSelector/ThumbnailSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnThumbnail = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();

    if (list.customThumbnail === 0) return null


    return (
        <>
            <>
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Thumbnail <p>{list.customThumbnail || 0}<span>.00</span></p></div>

                    : <ThumbnailSelector />}
            </>
        </>
    )
}

export default AddOnThumbnail;