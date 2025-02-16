
import { useDispatch, useSelector } from "react-redux";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import AddOnTypeAddOn from "./AddOnTypeAddOn";
interface IProps {
    isEdit: boolean;
}
const AddOnTypeAddOns = ({ isEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const { list } = useCalculateFinalPrice();
    const dispatch = useDispatch();
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


    return (
        <>
            {!isEdit ?
                <>
                    {selectedRequest?.projectInfoSettings.type.addOns.map((addOn, index) => {
                        if (index === 0 || !addOn.isSelected) return
                        return (

                            <div className={styles.infoContainer_priceItem}>
                                {addOn.header} <p>{addOn.price}<span>.00</span></p></div>
                        )
                    })}
                </>
                :
                <>
                    {selectedRequest?.projectInfoSettings.type.addOns.map((addOn, index) => {
                        if (index === 0 || !addOn.isSelected) return
                        return (
                            <AddOnTypeAddOn addOn={addOn} />
                        )
                    })}
                </>
            }
        </>


    )
}

export default AddOnTypeAddOns;