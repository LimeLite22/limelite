
import { DEFAULT } from "consts/consts";
import TimeSelector from "pages/NewRequest/Logistics/components/Calendar/TimeSelector";
import { useDispatch, useSelector } from "react-redux";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import { selectRequestInfo, updateLogisticInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
interface IProps {
    isEdit: boolean;
}

const AddOnTime = ({ isEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const { list } = useCalculateFinalPrice();
    const dispatch = useDispatch();


    if (list.rushHour === 0) return null

    return (
        <>

            {!isEdit ?
                <>
                    <div className={styles.infoContainer_priceItem}>
                        Rush hour <p>{list.rushHour}<span>.00</span></p></div>
                </>
                :
                <div className={`
                ${styles.dd}
                `} >
                    <div className={styles.dd_header}>Time</div>
                    <TimeSelector
                        time={selectedRequest?.logisticSettings?.preferredDate?.time || DEFAULT}
                        selectTime={(time) => {
                            selectedRequest?.logisticSettings && dispatch(updateLogisticInfoSettings(
                                {
                                    logisticInfoSettings: {
                                        ...selectedRequest?.logisticSettings,
                                        preferredDate: {
                                            ...selectedRequest?.logisticSettings?.preferredDate,
                                            time: time
                                        }
                                    },
                                    isEdit: false
                                }
                            ))


                        }}
                        isSubmit={true}
                        isError={false}
                        darkBorder={true}
                    />
                </div>
            }
        </>


    )
}

export default AddOnTime;