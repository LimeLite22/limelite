
import { useSelector } from "react-redux";

import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import AddOnTypeAddOn from "./AddOnTypeAddOn";
interface IProps {
    isEdit: boolean;
}
const AddOnTypeAddOns = ({ isEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);

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