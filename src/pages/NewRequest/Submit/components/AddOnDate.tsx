import { CalendarIcon2 } from "assets/images";
import { DEFAULT } from "consts/consts";
import { format } from "date-fns";
import Calendar from "pages/NewRequest/Logistics/components/Calendar/Calendar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import { selectRequestInfo, updateLogisticInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
interface IProps {
    isEdit: boolean;
}

const AddOnDate = ({ isEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const [isOpen, setIsOpen] = useState(false);
    const { list } = useCalculateFinalPrice();
    const price = (list.rushDay + list.weekEnd);
    const dispatch = useDispatch();

    if (price === 0) return null

    return (
        <>
            {!isEdit ?
                <>
                    {list.weekEnd > 0 && <div className={styles.infoContainer_priceItem}>
                        Weekend date <p>{list.weekEnd}<span>.00</span></p></div>
                    }
                    {list.rushDay > 0 &&
                        <div className={styles.infoContainer_priceItem}>
                            Rush date <p>{list.rushDay}<span>.00</span></p></div>}
                </>
                :
                <div className={`
                ${styles.dd}
                `} >
                    <div className={styles.dd_header}>Date</div>
                    <div
                        className={styles.infoContainer_date_item}
                        style={{ border: `1px solid var(--gray-light3)`, height: "41px" }}
                        onClick={() => {
                            setIsOpen(true)
                        }}
                    >
                        {selectedRequest?.logisticSettings.preferredDate?.date !== DEFAULT
                            ? format(selectedRequest?.logisticSettings?.preferredDate.date as Date, "MMM dd, yyyy")
                            : "00-00-0000"}

                        {<div className={styles.dd_addOn} style={{ marginLeft: "10px" }} >+{price}</div>}
                        <img
                            src={CalendarIcon2}
                            alt="calendar"
                        />
                    </div>

                    {isOpen && <Calendar
                        isOpened={true}
                        isPreferredDate={true}
                        onChange={(date) => {
                            selectedRequest?.logisticSettings && dispatch(updateLogisticInfoSettings(
                                {
                                    logisticInfoSettings: {
                                        ...selectedRequest?.logisticSettings,
                                        preferredDate: {
                                            ...selectedRequest?.logisticSettings?.preferredDate,
                                            date
                                        }
                                    },
                                    isEdit: false
                                }
                            ))
                        }}
                        onClose={() => {
                            setIsOpen(false)

                        }}
                    />}
                </div>
            }
        </>
    )
}

export default AddOnDate;