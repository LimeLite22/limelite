import { useCalculateFinalPrice } from "utils/priceCalculator";
import styles from "../../NewRequest.module.scss";
import ScriptSelector from "./ScriptSelector/ScriptSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnScript = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


    return (
        <div>
            <div >
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Script <p>{list.professionalScriptWriter || 0}<span>.00</span></p></div>

                    : <ScriptSelector />}
            </div>
        </div >
    )
}

export default AddOnScript;