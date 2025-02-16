
import { useCalculateFinalPrice } from "utils/priceCalculator";
import styles from "../../NewRequest.module.scss";
import VoiceoverTrackSelector from "./VoiceTrackSelector/VoiceoverTrackSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnVoiceoverTrack = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


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