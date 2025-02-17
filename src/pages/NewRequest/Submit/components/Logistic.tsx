
import { CalendarIcon2, CloseRed, EditIcon, LocationBlack, Success2 } from "assets/images";
import axios from "axios";
import { DEFAULT, OWN_ADDRESS, YES } from "consts/consts";
import { format } from "date-fns";
import Calendar from "pages/NewRequest/Logistics/components/Calendar/Calendar";
import TimeSelector from "pages/NewRequest/Logistics/components/Calendar/TimeSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateLogisticInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import ZoneDropdown from "./ZoneDropdown";
interface Suggestion {
    text: string;
}
const LogisticInfo = () => {
    const lIS = useSelector(selectRequestInfo)!.logisticSettings;
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(lIS);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const preferredDate = lIS?.preferredDate;

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
        setCurrent({ ...current, location: { ...current.location, street: e.target.value } });
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
        if (current.location.company !== lIS?.location.company
            || current.location.street !== lIS?.location.street
            || current.location.city !== lIS?.location.city
            || current.location.state !== lIS?.location.state
            || current.location.zip !== lIS?.location.zip
            || current.preferredDate !== lIS?.preferredDate
            || current.travel.zoneCode?.value !== lIS?.travel.zoneCode.value
        ) {
            if (
                current.location.company?.length !== 0 &&
                current.location.street?.length !== 0 &&
                current.location.city?.length !== 0 &&
                current.location.state?.length !== 0 &&
                current.location.zip?.length !== 0
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
        setCurrent(lIS);
    }
    const handleSave = () => {
        if (!isReady) return
        dispatch(updateLogisticInfoSettings(
            {
                logisticInfoSettings:
                {
                    ...lIS,
                    preferredDate: current.preferredDate,
                    location:
                    {
                        ...lIS.location,
                        street: current.location.street,
                        city: current.location.city || '',
                        state: current.location.state || '',
                        zip: current.location.zip || '',
                        company: current.location.company || '',

                    },
                    travel:
                    {
                        ...lIS.travel,
                        zoneCode: current.travel.zoneCode
                    }
                },
                isEdit: false
            }))
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [current])

    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Logistic
                {!isEdit &&
                    <div className={styles.infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div>}
                {isEdit &&
                    <div className={styles.infoContainer_header_buttons}>
                        <div
                            className={styles.infoContainer_header_decline}
                            onClick={handleDecline}><img src={CloseRed} alt='' /><div>Decline</div></div>
                        <div
                            className={`
                            ${styles.infoContainer_header_save}
                            ${!isReady ? styles.infoContainer_header_save_notReady : ''}
                            `}
                            onClick={handleSave}
                        ><img src={Success2} alt='' /><div>Save changes</div></div>
                    </div>}
            </div>
            {!isEdit && lIS.travel.selection === YES &&
                <div className={styles.infoContainer_text}>
                    <p>Zone</p> {lIS?.travel.zoneCode?.name}</div>

            }
            {isEdit && lIS.travel.selection === YES &&
                <div className={styles.infoContainer_text}>
                    <p>Zone</p>
                    <ZoneDropdown onChange={(e) => {
                        setCurrent({ ...current, travel: { ...current.travel, zoneCode: e } });
                    }} />
                </div>
            }
            {!isEdit && lIS.location.type === OWN_ADDRESS &&
                <div className={styles.infoContainer_text}>
                    <p>Address:</p>
                    {current.location.company}{" "}
                    {current.location.street}{" "}
                    {current.location.city}{" "}
                    {current.location.zip}
                </div>}
            {
                isEdit && lIS.location.type === OWN_ADDRESS && <>
                    <div className={styles.infoContainer_text} >
                        <p>Company Name:</p>
                        <input
                            value={current.location.company}
                            onChange={(e) => {
                                setCurrent({ ...current, location: { ...current.location, company: e.target.value } });
                            }}
                            placeholder="Enter company name"
                            type="company"
                            className={styles.infoContainer_input}
                        />
                    </div>
                    <div className={styles.infoContainer_text} >
                        <p>Address:</p>
                        <div style={{ position: "relative", width: "100%" }}>
                            <input
                                value={current.location.street}
                                onChange={handleChange}
                                placeholder="Enter street address"
                                type="street"
                                className={styles.infoContainer_input}
                            />
                            {suggestions?.length > 0 && (
                                <div className={styles.box_addressContainer_suggestions}>
                                    {suggestions.map((suggestion: any, index) => {
                                        const regex = new RegExp(`(${current.location.street})`, "gi");
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
                                                        location: {
                                                            ...current.location,
                                                            street: suggestion?.street_line,
                                                            city: suggestion.city,
                                                            state: suggestion.state,
                                                            zip: suggestion.zipcode,
                                                        },
                                                    });

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
                    <div className={styles.infoContainer_text} >
                        <p>City:</p>
                        <input
                            className={styles.infoContainer_input}
                            value={current.location.city}
                            onChange={(e) => {
                                setCurrent({ ...current, location: { ...current.location, city: e.target.value } });
                            }}
                            placeholder="Enter city"
                            name="city"
                            type="text"
                        />
                    </div>
                    <div className={styles.infoContainer_text} >
                        <p>State:</p>
                        <input
                            className={styles.infoContainer_input}
                            value={current.location.state}
                            onChange={(e) => {
                                setCurrent({ ...current, location: { ...current.location, state: e.target.value } });
                            }}
                            placeholder="Enter state"
                            name="state"
                            type="text"
                        />
                    </div>
                    <div className={styles.infoContainer_text} >
                        <p>Zip:</p>
                        <input
                            className={styles.infoContainer_input}
                            value={current.location.zip}
                            onChange={(e) => {
                                setCurrent({ ...current, location: { ...current.location, zip: e.target.value } });
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
                </>
            }
            {isEdit && <>
                <div className={styles.infoContainer_text} >
                    <p>Preferred date:</p>
                    <div className={styles.infoContainer_date}>
                        <div
                            className={styles.infoContainer_date_item}
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


