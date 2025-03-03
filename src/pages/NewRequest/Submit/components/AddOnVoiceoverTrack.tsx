
import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";
import VoiceoverTrackSelector from "./VoiceTrackSelector/VoiceoverTrackSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnVoiceoverTrack = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();

    if (list.professionalTruckAuthor === 0) return null


    return (
        <>
            {!isEdit ?
                <div className={styles.infoContainer_priceItem}>
                    Voiceover track <p>{list.professionalTruckAuthor}<span>.00</span></p></div>
                : <VoiceoverTrackSelector />}
        </>
    )
}

export default AddOnVoiceoverTrack;