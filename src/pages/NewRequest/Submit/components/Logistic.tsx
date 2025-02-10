
import { CalendarIcon2, CloseRed, EditIcon, LocationBlack, Success2 } from "assets/images";
import axios from "axios";
import { DEFAULT } from "consts/consts";
import { format } from "date-fns";
import ZoneSelector from "pages/NewRequest/components/ZoneSelector/ZoneSelector";
import Calendar from "pages/NewRequest/Logistics/components/Calendar/Calendar";
import TimeSelector from "pages/NewRequest/Logistics/components/Calendar/TimeSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateDraftField, updateLogisticInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import ZoneDropdown from "./ZoneDropdown";
interface Suggestion {
    text: string;
}
const LogisticInfo = () => {
    const lIS = useSelector(selectRequestInfo)?.logisticSettings;
    const dispatch = useDispatch();
    const defaultState = {
        company: lIS?.location.company,
        street: lIS?.location.street,
        city: lIS?.location.city,
        state: lIS?.location.state,
        zip: lIS?.location.zip,
        preferredDate: lIS?.preferredDate,
        zone: lIS?.travel.zoneCode,
    }
    const [current, setCurrent] = useState(defaultState);
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
        if (current.company !== lIS?.location.company
            || current.street !== lIS?.location.street
            || current.city !== lIS?.location.city
            || current.state !== lIS?.location.state
            || current.zip !== lIS?.location.zip
            || current.preferredDate !== lIS?.preferredDate
            || current.zone?.value !== lIS?.travel.zoneCode.value
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
        if (!isReady) return
        lIS && current.preferredDate && current.zone && dispatch(updateLogisticInfoSettings(
            {
                logisticInfoSettings:
                {
                    ...lIS,
                    preferredDate: current.preferredDate,
                    location:
                    {
                        ...lIS.location,
                        street: current.street || '',
                        city: current.city || '',
                        state: current.state || '',
                        zip: current.zip || '',
                        company: current.company || '',

                    },
                    travel:
                    {
                        ...lIS.travel,
                        zoneCode: current.zone
                    }
                },
                isEdit: true
            }))
        lIS && current.preferredDate && current.zone && dispatch(updateLogisticInfoSettings(
            {
                logisticInfoSettings:
                {
                    ...lIS,
                    preferredDate: current.preferredDate,
                    location:
                    {
                        ...lIS.location,
                        street: current.street || '',
                        city: current.city || '',
                        state: current.state || '',
                        zip: current.zip || '',
                        company: current.company || ''
                    },
                    travel:
                    {
                        ...lIS.travel,
                        zoneCode: current.zone
                    },
                },

                isEdit: false
            }))
        setCurrent(defaultState);
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [current])
    useEffect(() => {
        setCurrent(defaultState);
    }, [lIS])

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
            {!isEdit ?
                <div className={styles.infoContainer_text}>
                    <p>Zone</p> {lIS?.travel.zoneCode?.name}</div>
                : <div className={styles.infoContainer_text}>
                    <p>Zone</p>
                    <ZoneDropdown onChange={(e) => {
                        setCurrent({ ...current, zone: { name: e.name, value: e.value } });
                    }} />
                </div>}
            {!isEdit &&
                <div className={styles.infoContainer_text}>
                    <p>Address:</p>
                    {current.company}{" "}
                    {current.street}{" "}
                    {current.city}{" "}
                    {current.zip}
                </div>}
            {
                isEdit && <>
                    <div className={styles.infoContainer_text} >
                        <p>Company Name:</p>
                        <input
                            value={current.company}
                            onChange={(e) => {
                                setCurrent({ ...current, company: e.target.value });
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
                                value={current.street}
                                onChange={handleChange}
                                placeholder="Enter street address"
                                type="street"
                                className={styles.infoContainer_input}
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
                    <div className={styles.infoContainer_text} >
                        <p>City:</p>
                        <input
                            className={styles.infoContainer_input}
                            value={current.city}
                            onChange={(e) => {
                                setCurrent({ ...current, city: e.target?.value });
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
                            value={current.state}
                            onChange={(e) => {
                                setCurrent({ ...current, state: e.target?.value });
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


