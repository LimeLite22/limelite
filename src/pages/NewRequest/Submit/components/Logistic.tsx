
import { CalendarIcon2, CloseRed, EditIcon, LocationBlack, Success2 } from "assets/images";
import { DEFAULT } from "consts/consts";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import axios from "axios";
import TimeSelector from "pages/NewRequest/Logistics/components/Calendar/TimeSelector";
import Calendar from "pages/NewRequest/Logistics/components/Calendar/Calendar";
interface Suggestion {
    text: string;
}
const LogisticInfo = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const defaultState = {
        company: selectedRequest?.location.company,
        street: selectedRequest?.location.street,
        city: selectedRequest?.location.city,
        state: selectedRequest?.location.state,
        zip: selectedRequest?.location.zip,
        preferredDate: selectedRequest?.preferredDate
    }
    const [current, setCurrent] = useState(defaultState);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const preferredDate = selectedRequest?.preferredDate;

    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
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
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCurrent({ ...current, street: value });
        if (value?.length > 1) {
            try {
                const response = await axios.get<{ suggestions: Suggestion[] }>(
                    `https://us-autocomplete-pro.api.smarty.com/lookup?key=214096593787107506&search=${value}`,
                );

                const results = response.data.suggestions.map(
                    (suggestion: any) => suggestion,
                );
                setSuggestions(results);
            } catch (error) {
                console.error("Помилка при запиті до Smarty API", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const readyToSave = () => {
        let ready = true;
        if (current.company !== selectedRequest?.location.company
            || current.street !== selectedRequest?.location.street
            || current.city !== selectedRequest?.location.city
            || current.state !== selectedRequest?.location.state
            || current.zip !== selectedRequest?.location.zip
        ) {
            if (
                current.company?.length !== 0 &&
                current.street?.length !== 0 &&
                current.city?.length !== 0 &&
                current.state?.length !== 0 &&
                current.zip?.length !== 0
            ) {
                ready = true
            } else {
                ready = false
            }

        } else {
            ready = false
        }
        setIsReady(ready);
    }
    const handleOnEdit = () => {
        setIsEdit(true);
    }
    const handleDecline = () => {
        setIsEdit(false);
        setCurrent(defaultState);
    }
    const handleSave = () => {
        console.log(current.company);
        dispatch(
            updateDraftField({
                path: "location.company",
                value: current.company,
            }),
        );
        dispatch(
            updateDraftField({
                path: "location.street",
                value: current.street,
            }),
        );
        dispatch(
            updateDraftField({
                path: "location.city",
                value: current.city,
            }),
        );
        dispatch(
            updateDraftField({
                path: "location.state",
                value: current.state,
            }),
        );
        dispatch(
            updateDraftField({
                path: "location.zip",
                value: current.zip,
            }),
        );
        dispatch(
            updateDraftField({
                path: "preferredDate",
                value: current.preferredDate,
            }),
        );


        setCurrent(defaultState);
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [current])
    useEffect(() => {
        setCurrent(defaultState);
    }, [selectedRequest])

    return (
        <div className={styles.nR_submitContainer_infoContainer}>
            <div className={styles.nR_submitContainer_infoContainer_header}>Logistic
                {!isEdit &&
                    <div className={styles.nR_submitContainer_infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div>}
                {isEdit &&
                    <div className={styles.nR_submitContainer_infoContainer_header_buttons}>
                        <div
                            className={styles.nR_submitContainer_infoContainer_header_decline}
                            onClick={handleDecline}><img src={CloseRed} alt='' />Decline</div>
                        <div
                            className={`
                            ${styles.nR_submitContainer_infoContainer_header_save}
                            ${!isReady ? styles.nR_submitContainer_infoContainer_header_save_notReady : ''}
                            `}
                            onClick={handleSave}
                        ><img src={Success2} alt='' /> Save changes</div>
                    </div>}
            </div>
            {!isEdit &&
                <div className={styles.nR_submitContainer_infoContainer_text}>
                    <p>Address:</p>
                    {current.company}{" "}
                    {current.street}{" "}
                    {current.city}{" "}
                    {current.zip}
                </div>}
            {
                isEdit && <>
                    <div className={styles.nR_submitContainer_infoContainer_text} >
                        <p>Company Name:</p>
                        <input
                            value={current.company}
                            onChange={(e) => {
                                setCurrent({ ...current, company: e.target.value });
                            }}
                            placeholder="Enter company name"
                            type="company"
                            className={styles.nR_submitContainer_infoContainer_input}
                        />
                    </div>
                    <div className={styles.nR_submitContainer_infoContainer_text} >
                        <p>Address:</p>
                        <div style={{ position: "relative", width: "100%" }}>
                            <input
                                value={current.street}
                                onChange={handleChange}
                                placeholder="Enter street address"
                                type="street"
                                className={styles.nR_submitContainer_infoContainer_input}
                            />
                            {suggestions?.length > 0 && (
                                <div className={styles.box_addressContainer_suggestions}>
                                    {suggestions.map((suggestion: any, index) => {
                                        const regex = new RegExp(`(${current.street})`, "gi");
                                        const highlightedText = suggestion?.street_line?.replace(
                                            regex,
                                            `<span style="color: var(--black); font-weight: 700">$1</span>`,
                                        );

                                        return (
                                            <div
                                                className={styles.box_addressContainer_suggestion}
                                                key={index}
                                                onClick={() => {
                                                    setCurrent({
                                                        ...current,
                                                        street: suggestion.street_line,
                                                        city: suggestion.city,
                                                        state: suggestion.state,
                                                        zip: suggestion.zipcode,
                                                    })
                                                    setSuggestions([]);
                                                }}
                                            >
                                                <img src={LocationBlack} alt="location" />
                                                <span
                                                    className={styles.box_addressContainer_street}
                                                    dangerouslySetInnerHTML={{ __html: highlightedText }}
                                                />
                                                <div className={styles.box_addressContainer_city}>
                                                    {suggestion.city}
                                                </div>
                                                <div className={styles.box_addressContainer_state}>
                                                    {suggestion.state}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.nR_submitContainer_infoContainer_text} >
                        <p>City:</p>
                        <input
                            className={styles.nR_submitContainer_infoContainer_input}
                            value={current.city}
                            onChange={(e) => {
                                setCurrent({ ...current, city: e.target?.value });
                            }}
                            placeholder="Enter city"
                            name="city"
                            type="text"
                        />
                    </div>
                    <div className={styles.nR_submitContainer_infoContainer_text} >
                        <p>State:</p>
                        <input
                            className={styles.nR_submitContainer_infoContainer_input}
                            value={current.state}
                            onChange={(e) => {
                                setCurrent({ ...current, state: e.target?.value });
                            }}
                            placeholder="Enter state"
                            name="state"
                            type="text"
                        />
                    </div>
                    <div className={styles.nR_submitContainer_infoContainer_text} >
                        <p>Zip:</p>
                        <input
                            className={styles.nR_submitContainer_infoContainer_input}
                            value={current.zip}
                            onChange={(e) => {
                                setCurrent({ ...current, zip: e.target?.value });
                            }}
                            placeholder="Enter zip"
                            name="zip"
                            type="text"
                        />
                    </div>

                </>
            }
            {!isEdit &&
                <>
                    <div className={styles.nR_submitContainer_infoContainer_text}><p>Preferred date:</p>{preferredDate?.date !== DEFAULT
                        ? format(preferredDate?.date as Date, "E, dd MMM, yyyy")
                        : "Mon, November 22, 2024"}
                        {' '}
                        {preferredDate?.time !== DEFAULT && endTime ? (
                            <>
                                <span style={{ marginLeft: "12px" ,marginRight:"6px"}}>{" "}from{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time}> {preferredDate?.time.hour}:00</div>
                                <span style={{ marginLeft: "6px" ,marginRight:"6px"}}>{" "}to{" "}</span>

                                <div className={styles.nR_submitContainer_infoContainer_text_time}>    {endTime.hour}:00 {endTime.period} </div>

                            </>
                        ) : (
                            <>
                                <span style={{ marginLeft: "12px" ,marginRight:"6px"}}>{" "}from{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time}>00:00</div>
                                <span style={{ marginLeft: "6px" ,marginRight:"6px"}}>{" "}to{" "}</span>
                                <div className={styles.nR_submitContainer_infoContainer_text_time}>00:00</div>
                            </>
                        )}
                    </div>
                    {/* <div className={styles.nR_submitContainer_infoContainer_text}><p>Alternative date:</p>
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
                    </div> */}
                </>
            }
            {isEdit && <>
                <div className={styles.nR_submitContainer_infoContainer_text} >
                    <p>Preferred date:</p>
                    <div className={styles.nR_submitContainer_infoContainer_date}>
                        <div
                            className={styles.nR_submitContainer_infoContainer_date_item}
                            onClick={() => {
                                setIsPopUpOpen(true);
                            }}
                        >
                            {current.preferredDate?.date !== DEFAULT
                                ? format(current.preferredDate?.date as Date, "MMM dd, yyyy")
                                : "00-00-0000"}
                            <img
                                src={CalendarIcon2}
                                alt="calendar"
                            />
                        </div>
                        <TimeSelector
                            time={current.preferredDate?.time || DEFAULT}
                            selectTime={(time) => {
                                if (current.preferredDate?.date) {
                                    setCurrent({ ...current, preferredDate: { ...current.preferredDate, time } });
                                }

                            }}
                            isSubmit={true}
                            isError={false}
                        />
                    </div>

                </div>
                {/* <div className={styles.nR_submitContainer_infoContainer_text} >
                    <p>Alternative date:</p>
                    <div className={styles.nR_submitContainer_infoContainer_date}>
                        <div
                            className={styles.nR_submitContainer_infoContainer_date_item}
                            onClick={() => {
                                setIsPopUpOpen(true);
                            }}
                        >
                            {preferredDate?.date !== DEFAULT
                                ? format(preferredDate?.date as Date, "MMM dd, yyyy")
                                : "00-00-0000"}
                            <img
                                src={CalendarIcon2}
                                alt="calendar"
                            />
                        </div>
                        <TimeSelector
                            time={preferredDate?.time || DEFAULT}
                            selectTime={(time) => {
     
                            }}
                            isError={false}
                        />
                    </div>
                </div> */}
            </>}
            <Calendar
                isOpened={isPopUpOpen}
                isPreferredDate={true}
                onChange={(date) => {
                    console.log(date);
                    if (current?.preferredDate?.time) {
                        setCurrent({
                            ...current,
                            preferredDate: {
                                time: current.preferredDate.time,
                                date: date
                            }
                        })
                    }

                }}
                onClose={() => {
                    setIsPopUpOpen(false);
                }}
            />
        </div>
    )
}

export default LogisticInfo;


