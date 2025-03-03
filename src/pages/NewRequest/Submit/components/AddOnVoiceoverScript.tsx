import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";
import VoiceoverScriptSelector from "./VoiceOverScriptSelector/VoiceoverScriptSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnVoiceoverScript = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();

    if (list.professionalVoiceWriter === 0) return null


    return (
        <>
            <>
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Voiceover script <p>{list.professionalVoiceWriter}<span>.00</span></p></div>
                    : <VoiceoverScriptSelector />}
            </>
        </>
    )
}

export default AddOnVoiceoverScript;