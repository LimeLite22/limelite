import { Edit, EditIcon } from "assets/images";
import { DEFAULT } from "consts/consts";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton"
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";
import AddOnsContainer from "./components/AddOnsContainer";

const Submit = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const option = selectedRequest?.option;
    const isAlternate = selectedRequest?.isAlternate;
    const preferredDate = selectedRequest?.preferredDate;
    const alternateDate = selectedRequest?.alternateDate;
    const street = selectedRequest?.location.street;
    const city = selectedRequest?.location.city;
    const zip = selectedRequest?.location.zip;
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
        <>
            <StepsNavigation />
            <div
                className={styles.nR_submitContainer}
            >
                <StepsNavigation />
                <div className={styles.nR_header_text}>
                    Review and Submit request
                </div>
                <div className={styles.nR_submitContainer_text}>
                    Your request will not be submitted until you click ‘Submit’. To make edits,
                    click ‘Go back’ or ‘Edit’ below.
                </div>
                <div className={styles.nR_submitContainer_infoContainer}>
                    <div className={styles.nR_submitContainer_infoContainer_header}>Project information
                        <div className={styles.nR_submitContainer_infoContainer_header_edit}>
                            <img src={EditIcon} alt='' />
                            Edit</div>
                    </div>
                    <div className={styles.nR_submitContainer_infoContainer_text}>
                        <p>Requested type:</p> <span>{option?.value}  {option?.credits && (
                            <div
                                className={
                                    `${styles.footer_container_typeContainer_text_title1_tag}
                            `
                                }
                            >
                                {option?.credits}{" "}
                                {option?.credits > 1 ? "Credits" : "Credit"}{" "}
                            </div>
                        )}</span></div>
                    <div className={styles.nR_submitContainer_infoContainer_text}><p>Name:</p> {selectedRequest?.projectName}</div>
                    <div className={styles.nR_submitContainer_infoContainer_text}><p>Type:</p> {selectedRequest?.projectType.header}</div>
                    <div className={styles.nR_submitContainer_infoContainer_text}><p>Tone:</p> {selectedRequest?.projectTone}</div>
                    <div className={styles.nR_submitContainer_infoContainer_text}><p>Approach:</p> {selectedRequest?.approachList.map((approach) => approach).join(", ")}</div>
                    <div className={styles.nR_submitContainer_infoContainer_text}><p>Details</p> 
                    <div className={styles.nR_submitContainer_overview} >Project overview</div>
                    </div>
                </div>
                <div className={styles.nR_submitContainer_infoContainer}>
                    <div className={styles.nR_submitContainer_infoContainer_header}>Logistic
                        <div className={styles.nR_submitContainer_infoContainer_header_edit}>
                            <img src={EditIcon} alt='' />
                            Edit</div>
                    </div>
                    <div className={styles.nR_submitContainer_infoContainer_text}><p>Address:</p> {street || "1234 Elmwood Avenue,"} {city || "Anytown,"} {zip || "12345"}</div>
                    <div className={styles.nR_submitContainer_infoContainer_text}><p>Preferred date:</p>{preferredDate?.date !== DEFAULT
                        ? format(preferredDate?.date as Date, "E, dd MMM, yyyy")
                        : "Mon, November 22, 2024"}
                        {' '}
                        {preferredDate?.time !== DEFAULT && endTime ? (
                            <>
                                <span style={{ marginLeft: "12px" }}>{" "}from{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time}> {preferredDate?.time.hour}:00</div>
                                <span>{" "}to{" "}</span>

                                <div className={styles.nR_submitContainer_infoContainer_text_time}>    {endTime.hour}:00 {endTime.period} </div>

                            </>
                        ) : (
                            <>
                                <span style={{ marginLeft: "12px" }}>{" "}from{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time}>00:00</div>
                                <span>{" "}to{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time}>00:00</div>
                            </>
                        )}
                    </div>
                    <div className={styles.nR_submitContainer_infoContainer_text}><p>Alternative date:</p>
                        {isAlternate ? format(alternateDate?.date as Date, "E, dd MMM, yyyy") : "Mon, 22 Nov, 2024"}
                        {' '}
                        {alternateDate?.time !== DEFAULT && endTime ? (
                            <>
                                <span style={{ marginLeft: "12px" }}>{" "}from{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time} >{alternateDate?.time.hour}:00 </div>
                                <span>{" "}to{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time} >{endTime.hour}:00 {endTime.period}</div>

                            </>
                        ) : (
                            <>
                                <span style={{ marginLeft: "12px" }}>{" "}from{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time} >00:00</div>
                                <span>{" "}to{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time} >00:00</div>
                            </>
                        )}
                    </div>
                </div>
                <AddOnsContainer />

                <div className={styles.nR_submitContainer_text2}>Agreement </div>
                <div className={styles.nR_submitContainer_text3}>Mauris ipsum maecenas nunc risus. Adipiscing suscipit massa amet nulla arcu sed. Commodo
                    massa commodo et consequat. Mauris neque sed consectetur porta. Tempor tristique malesuada
                    fringilla pulvinar sagittis neque elit sed mus. Lobortis.</div>
                <div className={styles.nR_submitContainer_buttons}>
                    <BackButton />
                    <NextButton isDisabled={false} onClick={() => { }} />
                </div>

            </div>
        </>
    )
}

export default Submit;