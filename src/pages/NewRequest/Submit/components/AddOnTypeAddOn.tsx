
import { IAddOnsValue } from "interfaces/interfaces";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCalculateFinalPrice } from "utils/priceCalculator";
import ReactDOM from "react-dom";

import { selectRequestInfo, updateAddOnSelectionStatus } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import { CloseCalendar } from "assets/images";
interface IProps {
    addOn: IAddOnsValue
}
const AddOnTypeAddOn = ({ addOn }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const [isOpened, setOpened] = useState(false);
    const dispatch = useDispatch();
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


    return (
        <>

            <>
                <div className={styles.infoContainer_priceItem} style={{ marginBottom: '15px' }}>
                    {addOn.header}  <img
                        onClick={() => setOpened(!isOpened)}
                        src={CloseCalendar}
                        className={"popUp_content_close"}
                        alt="Close"
                    /> </div>

                {isOpened &&
                    ReactDOM.createPortal(
                        <div className={styles.popUp}>
                            <div className={styles.popUp_content}>
                                <div className={styles.popUp_header}>Modify selected Add-ons
                                    <div className={styles.popUp_closeContainer}>
                                        <img
                                            onClick={() => { }}
                                            src={CloseCalendar}
                                            className={"popUp_content_close"}
                                            alt="Close"
                                        />
                                    </div></div>
                                <div className={styles.popUp_text}>You're removing <span>{addOn.header}</span>.
                                    If the new option isn't an add-on, the current one will be removed. If it has a
                                    different price, the estimated total will update automatically</div>
                                <div className={styles.popUp_buttons}>
                                    <div className={styles.popUp_cancel} onClick={() => {
                                        setOpened(false)
                                    }}>Keep without changing</div>
                                    <div className={`${styles.popUp_save} 
                `} onClick={() => {
                                            dispatch(updateAddOnSelectionStatus({ id: addOn.id }))
                                            setOpened(false)
                                        }}>Save & Update</div>
                                </div>
                            </div>

                        </div>,
                        document.body,
                    )}
            </>
        </>


    )
}

export default AddOnTypeAddOn;