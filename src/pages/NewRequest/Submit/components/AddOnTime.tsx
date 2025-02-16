
import { DEFAULT } from "consts/consts";
import TimeSelector from "pages/NewRequest/Logistics/components/Calendar/TimeSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import { selectRequestInfo, updateAddOnLocation, updateLogisticInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
interface IProps {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const AddOnTime = ({ isEdit, setIsEdit }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const [current, setCurrent] = useState(selectedRequest?.logisticSettings.location);
    const { list } = useCalculateFinalPrice();
    const dispatch = useDispatch();

    useEffect(() => {
        current && dispatch(updateAddOnLocation(current))
    }, [])
    //  зробити логіку роздлення відображення після тесту
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null


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