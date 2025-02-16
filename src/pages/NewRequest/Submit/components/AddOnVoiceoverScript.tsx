import { useCalculateFinalPrice } from "utils/priceCalculator";
import styles from "../../NewRequest.module.scss";
import VoiceoverScriptSelector from "./VoiceOverScriptSelector/VoiceoverScriptSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnVoiceoverScript = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


    return (
        <div>
            <div >
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Voiceover script <p>{list.professionalVoiceWriter}<span>.00</span></p></div>
                    : <VoiceoverScriptSelector />}
            </div>
        </div >
    )
}

export default AddOnVoiceoverScript;