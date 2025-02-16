import { useCalculateFinalPrice } from "utils/priceCalculator";
import styles from "../../NewRequest.module.scss";
import ScriptSelector from "./ScriptSelector/ScriptSelector";
interface IProps {
    isEdit: boolean;
}

const AddOnScript = ({ isEdit }: IProps) => {
    const { list } = useCalculateFinalPrice();

    if (list.professionalScriptWriter === 0) return null


    return (
        <>
            <>
                {!isEdit ?
                    <div className={styles.infoContainer_priceItem}>
                        Script <p>{list.professionalScriptWriter || 0}<span>.00</span></p></div>

                    : <ScriptSelector />}
            </>
        </>
    )
}

export default AddOnScript;