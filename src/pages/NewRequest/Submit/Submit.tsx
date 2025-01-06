import { Edit } from "assets/images";
import { DEFAULT } from "consts/consts";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectRequestInfo } from "../../../redux/requests/reducer";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton"
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";

const Submit = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const option = selectedRequest?.option;
    const preferredDate = selectedRequest?.preferredDate;
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
        <div
            className={styles.nR_submitContainer}
        >
            <StepsNavigation />
            <div className={styles.nR_header_text}>
                Review request details
            </div>
            <div className={styles.nR_submitText}>
                Please provide important information below regarding your completed video
            </div>
            <div className={styles.nR_submitContainer_content}>
                <div className={styles.nR_submitContainer_content_main}>
                    <div className={styles.nR_submitContainer_content_main_generalInfo}>
                        <div className={styles.nR_submitContainer_content_main_generalInfo_header}>Project information</div>
                        <div className={styles.nR_submitContainer_content_main_generalInfo_row}>
                            <div className={styles.nR_submitContainer_content_main_generalInfo_column}>
                                <div className={styles.nR_submitContainer_content_main_generalInfo_line} > <p>Name:</p> {selectedRequest?.projectName}</div>
                                <div className={styles.nR_submitContainer_content_main_generalInfo_line}> <p>Tone:</p> {selectedRequest?.projectType?.header} </div>
                                <div className={styles.nR_submitContainer_content_main_generalInfo_line}><p>Approach:</p> {selectedRequest?.approachList.map((approach) => approach).join(", ")}</div>
                            </div>
                            <div className={styles.nR_submitContainer_content_main_generalInfo_column}>
                                <div className={styles.nR_submitContainer_content_main_generalInfo_line}><p>Audience:</p> {selectedRequest?.targetAudience}</div>
                                <div className={styles.nR_submitContainer_content_main_generalInfo_line}><p>Tone:</p> {selectedRequest?.projectTone}</div>
                                <div className={styles.nR_submitContainer_content_main_generalInfo_line}><p>Details:</p> Project overview</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.nR_submitContainer_content_main_generalInfo}>
                        <div className={styles.nR_submitContainer_content_main_generalInfo_header}>Request  details</div>
                        <div className={styles.nR_submitContainer_content_main_generalInfo_detail}>
                            <div className={styles.nR_submitContainer_content_main_generalInfo_detail_header}>Logistic:</div>
                        </div>
                        <div className={styles.nR_submitContainer_content_main_generalInfo_detail}>
                            <div className={styles.nR_submitContainer_content_main_generalInfo_detail_header}>Script:</div>
                        </div>
                        <div className={styles.nR_submitContainer_content_main_generalInfo_detail}>
                            <div className={styles.nR_submitContainer_content_main_generalInfo_detail_header}>Interview:</div>
                        </div>
                        <div className={styles.nR_submitContainer_content_main_generalInfo_detail}>
                            <div className={styles.nR_submitContainer_content_main_generalInfo_detail_header}>Voiceover:</div>
                        </div>
                    </div>
                    <div className={styles.nR_submitContainer_content_main_buttons}>
                        <BackButton />
                        <NextButton isDisabled={false} onClick={() => { }} />
                    </div>
                </div>
                <div className={styles.nR_submitContainer_content_sideInfo}>
                    <div className={styles.nR_submitContainer_content_sideInfo_box}>
                        <div className={styles.nR_submitContainer_content_sideInfo_box_header}>Request type
                            <img src={Edit} alt="" />
                        </div>
                        <div className={styles.nR_submitContainer_content_sideInfo_box_type} >
                            <div>              <img
                                className={styles.nR_submitContainer_content_sideInfo_box_typeImg}
                                src={option?.img}
                                alt=""
                            />

                                {option?.value}</div>

                            {option?.credits && (
                                <div
                                    className={
                                        styles.footer_container_typeContainer_text_title1_tag
                                    }
                                >
                                    {option?.credits}{" "}
                                    {option?.credits > 1 ? "Credits" : "Credit"}{" "}
                                </div>
                            )}</div>
                    </div>
                    <div className={styles.nR_submitContainer_content_sideInfo_box}>
                        <div className={styles.nR_submitContainer_content_sideInfo_box_header}>Selected date
                            <img src={Edit} alt="" />
                        </div>
                        <div className={styles.nR_submitContainer_content_sideInfo_box_dateText} > {preferredDate?.date !== DEFAULT
                            ? format(preferredDate?.date as Date, "E,MMMM dd, yyyy")
                            : "Mon, November 22, 2024"}</div>
                        <div className={styles.nR_submitContainer_content_sideInfo_box_timeText}>
                            {preferredDate?.time !== DEFAULT && endTime ? (
                                <>
                                    from
                                    <span> {preferredDate?.time.hour}:00 </span>
                                    to{" "}
                                    <span>
                                        {endTime.hour}:00 {endTime.period}
                                    </span>
                                </>
                            ) : (
                                <>
                                    from{" "}
                                    <span >00:00 </span>
                                    to{" "}
                                    <span >
                                        00:00
                                    </span>{" "}
                                    AM
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.nR_submitContainer_content_sideInfo_box}>
                        <div className={styles.nR_submitContainer_content_sideInfo_box_header}>Shoot Address
                            <img src={Edit} alt="" />
                        </div>
                        <div className={styles.nR_submitContainer_content_sideInfo_box_dateText}>  {street || "1234 Elmwood Avenue,"}  <br />   {city || "Los Angeles"},{" "}</div>
                        <div className={styles.nR_submitContainer_content_sideInfo_box_timeText}>    {zip || "CA 90001"}</div>
                    </div>
                    <div className={styles.nR_submitContainer_content_sideInfo_addOnsHeader} >Requested Add-ons, $</div>
                    <div className={styles.nR_submitContainer_content_sideInfo_addOns}>
                        Rush shoot     <p>595.<span>00</span></p>
                    </div>
                    <div className={styles.nR_submitContainer_content_sideInfo_addOns}>
                        Studio rental     <p>595.<span>00</span></p>
                    </div>
                    <div className={styles.nR_submitContainer_content_sideInfo_addOns}>
                        Scriptwriter (script)    <p>595.<span>00</span></p>
                    </div>
                    <div className={styles.nR_submitContainer_content_sideInfo_addOns}>
                        Interviewer    <p>595.<span>00</span></p>
                    </div>
                    <div className={styles.nR_submitContainer_content_sideInfo_addOns}>
                        Virtually interview    <p>595.<span>00</span></p>
                    </div>
                    <div className={styles.nR_submitContainer_content_sideInfo_addOns}>
                        Scriptwriter (voiceover)    <p>595.<span>00</span></p>
                    </div>

                    <div className={styles.nR_submitContainer_content_sideInfo_total}>
                        Estimated Price: <p>1395. <span>00</span></p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Submit;