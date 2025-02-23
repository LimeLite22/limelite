import { DEFAULT, OWN_ADDRESS, YES } from "consts/consts";
import { format } from "date-fns";
import { useState } from "react";
import { testRequest } from "../../../redux/requests/consts";
import styles from "../ProjectsPage.module.scss";
const LogisticSettings = () => {
    const lIS = testRequest.logisticSettings;
    const [current, setCurrent] = useState(lIS);

    const preferredDate = lIS?.preferredDate;
    const calculateEndTime = (
        hour: number | undefined,
        period: string | undefined,
    ): { hour: number; period: string } => {
        if (!hour || !period) return { hour: 0, period: "AM" };
        let adjustedHour = hour + 3;
        let adjustedPeriod = period;

        if (adjustedHour >= 12) {
            if (adjustedHour > 12) adjustedHour -= 12;
            adjustedPeriod = period === "AM" ? "PM" : "AM";
        }

        return { hour: adjustedHour, period: adjustedPeriod };
    };
    const endTime =
        preferredDate?.time !== DEFAULT &&
        calculateEndTime(preferredDate?.time?.hour, preferredDate?.time?.type);


    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Logistic
            </div>
            <div className={styles.infoContainer_text}><p>Travel for shoot</p>{lIS.travel.selection}  </div>
            <div className={styles.infoContainer_text}><p>Shoot location</p>{lIS.location.type} </div>
            {lIS.travel.selection === YES &&
                <div className={styles.infoContainer_text}>
                    <p>Zone</p> {lIS?.travel.zoneCode?.name}</div>

            }
            {lIS.location.type === OWN_ADDRESS &&
                <>
                    <div className={styles.infoContainer_text}>
                        <p>Address:</p>
                        {current.location.company}{" "}
                        {current.location.street}{" "}
                        {current.location.city}{" "}
                        {current.location.zip}
                    </div>
                    <div className={styles.infoContainer_text} >
                        <p>Protective equipment</p>
                        {current.safetyEquipment === true ? 'Required' : 'Not Required'}
                    </div>
                </>
            }
            <div className={styles.infoContainer_text}><p>Preferred date:</p>
                <div style={{ display: "flex" }}>
                    {preferredDate?.date !== DEFAULT
                        ? format(preferredDate?.date as Date, "E, dd MMM, yyyy")
                        : "Mon, November 22, 2024"}
                    {' '}
                    {preferredDate?.time !== DEFAULT && endTime ? (
                        <>
                            <span style={{ marginLeft: "12px", marginRight: "6px" }}>{" "}from{" "}</span>
                            <div className={styles.infoContainer_text_time}> {preferredDate?.time.hour}:00</div>
                            <span style={{ marginLeft: "6px", marginRight: "6px" }}>{" "}to{" "}</span>
                            <div className={styles.infoContainer_text_time}>    {endTime.hour}:00 {endTime.period} </div>

                        </>

                    ) : (
                        <>
                            <span style={{ marginLeft: "12px", marginRight: "6px" }}>{" "}from{" "}</span>
                            <div className={styles.infoContainer_text_time}>00:00</div>
                            <span style={{ marginLeft: "6px", marginRight: "6px" }}>{" "}to{" "}</span>
                            <div className={styles.infoContainer_text_time}>00:00</div>
                        </>
                    )}
                </div>
            </div>

            <div className={styles.infoContainer_text}><p>Shot list</p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta expedita illum sapiente minima eveniet nesciunt ea a non aliquid sunt autem qui minus est ad maiores, explicabo quae fugiat ullam?
            </div>

        </div>
    )
}

export default LogisticSettings;