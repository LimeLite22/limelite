
import { ArrowBlue3, CloseRed, EditIcon, StatusApproved, StatusProgress, StatusUnavailable, Success2, Audio, Delete, Download } from "assets/images";
import { APPROVED_TEXT_STATUS, DEFAULT, IN_PROGRESS_TEXT_STATUS, QUESTIONS_ON_LOCATION, TRACK_AUTHOR_CLIENT, TRACK_AUTHOR_PROFESSIONAL, UNAVAILABLE_TEXT_STATUS, VIRTUAL_INTERVIEW } from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const VoiceoverOwnScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const text = selectedRequest?.voiceTrackSettings.scriptAuthorOwnSettings.text;
    const status = selectedRequest?.voiceTrackSettings.scriptAuthorOwnSettings.scriptStatus;
    const defaultState = {
        status,
        text,
        file: selectedRequest?.voiceTrackSettings.track
    }
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(defaultState);
    const [error, setError] = useState<string | null>(null);
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isDetailTextBig = text
        && text.length > 200;

    const readyToSave = () => {
        let ready = true;
        if (current.text !== text
            || current.status !== status
        ) {
            if (current.text?.length !== 0) {
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
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];

        if (uploadedFile) {
            const allowedExtensions = ["audio/mpeg", "audio/wav", "audio/aiff"];
            if (allowedExtensions.includes(uploadedFile.type)) {
                setError(null);
                setCurrent((prev) => ({ ...prev, file: uploadedFile }))
            } else {
                setError("Файл повинен бути формату MP3, WAV або AIFF");
                setCurrent((prev) => ({ ...prev, file: DEFAULT }))
            }
        }
    };
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };
    const handleSave = () => {
        if (!isReady) return
        dispatch(
            updateDraftField({
                path: "voiceTrackSettings.scriptAuthorOwnSettings.text",
                value: current.text,
            }),
        );
        dispatch(
            updateDraftField({
                path: "voiceTrackSettings.scriptAuthorOwnSettings.scriptStatus",
                value: current.status,
            })
        )
        dispatch(
            updateDraftField({
                path: 'voiceTrackSettings.track',
                value: current.file,
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
    // if (selectedRequest?.voiceTrackSettings.trackAuthor !== TRACK_AUTHOR_PROFESSIONAL) return null
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>About Your Voiceover

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
            {/* {selectedRequest?.voiceTrackSettings.trackAuthor === TRACK_AUTHOR_CLIENT && */}
            <div className={styles.infoContainer_text}>
                <p>Script Status:</p>
                {isEdit ? <div className={`${styles.box_container} ${styles.box_container_submit}`}>
                    {current.file === DEFAULT &&
                        <>
                            <div className={styles.box_title}>
                                Upload a high quality voice track:
                            </div>
                            <div className={`${styles.box_title2} ${styles.box_title2_submit} `} style={{ whiteSpace: "wrap" }}>
                                Please upload high quality, uncompressed audio files (e.g., WAV or
                                AIFF). MP3 files are acceptable but are lower quality.
                            </div>
                        </>
                    }

                    <input
                        type="file"
                        accept=".mp3, .wav, .aiff"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    {current.file !== DEFAULT && (
                        <div className={`${styles.box_audioFile} ${styles.box_audioFile_submit}`}>
                            <img src={Audio} alt="" />
                            <div style={{ flex: 1 }}>
                                <div>{current.file?.name}</div>
                                <div>{current.file?.size && Number(current.file?.size / 1000000).toFixed(2)} mb</div>
                            </div>
                            <img
                                onClick={() => {
                                    setCurrent((prev) => ({ ...prev, file: DEFAULT }))
                                }}
                                src={Delete}
                                alt=""
                            />
                        </div>
                    )}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {current.file === DEFAULT &&
                        <div onClick={handleDivClick} className={styles.box_audioFileButton}>
                            <img
                                src={Download}
                                alt="Download icon"
                                style={{ width: "24px", height: "24px" }}
                            />
                            <span >
                                Upload WAV or MP3 file
                            </span>
                        </div>
                    }

                </div> : <div className={styles.box_audioFileSubmit}>
                    <img src={Audio} alt="" />
                    <div>
                        <div className={styles.box_audioFileSubmit_text}>{current.file !== DEFAULT && current.file?.name}</div>
                        <div className={styles.box_audioFileSubmit_text}>{current.file !== DEFAULT && current.file?.size && Number(current.file?.size / 1000000).toFixed(2)} mb</div>
                    </div>
                </div>

                }

            </div>
            {/*   }  */}

            <div className={styles.infoContainer_text}><p>Script Status:</p>
                {isEdit ?
                    <div className={styles.infoContainer_statuses}>
                        <div
                            className={`${styles.box_status} ${current.status === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                setCurrent((prev) => ({ ...prev, status: APPROVED_TEXT_STATUS }))
                            }}
                        >
                            <img src={StatusApproved} alt="status" />
                            {APPROVED_TEXT_STATUS}
                        </div>
                        <div
                            className={`${styles.box_status} ${current.status === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                setCurrent((prev) => ({ ...prev, status: IN_PROGRESS_TEXT_STATUS }))
                            }}
                        >
                            <img src={StatusProgress} alt="status" />
                            {IN_PROGRESS_TEXT_STATUS}
                        </div>
                        <div
                            className={`${styles.box_status} ${current.status === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                setCurrent((prev) => ({ ...prev, status: UNAVAILABLE_TEXT_STATUS }))
                            }}
                        >
                            <img src={StatusUnavailable} alt="status" />
                            {UNAVAILABLE_TEXT_STATUS}
                        </div>
                    </div> : status}
            </div>
            <div className={styles.infoContainer_text}><p className={`
                ${styles.infoContainer_detailsHeader}
                ${isDetailTextBig ? styles.infoContainer_detailsHeader_big : ''}
                ${isDetailsExpanded ? styles.infoContainer_detailsHeader_expanded : ''}
                `}
            >Script:</p>
                {isEdit ?
                    <textarea className={styles.infoContainer_textarea}
                        onChange={(e) => setCurrent({ ...current, text: e.target.value })}
                        value={current.text} /> :
                    <div>
                        <div className={`
                   ${styles.infoContainer_details} 
                   ${isDetailsExpanded ? styles.infoContainer_details_expanded : ''}`}
                        >
                            {text}
                        </div>
                        {isDetailTextBig &&
                            <>
                                <div className={`
                        ${styles.infoContainer_details_shadow}
                        ${isDetailsExpanded ? styles.infoContainer_details_shadow_expanded : ''}
                        `}></div>
                                <div
                                    className={`
                           ${styles.infoContainer_details_showAll}
                           ${isDetailsExpanded ? styles.infoContainer_details_showAll_expanded : ''}
                               `
                                    }
                                    onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                                >
                                    <>{isDetailsExpanded ? "Show less" : "Show all text"}<img src={ArrowBlue3} alt='' /></>

                                </div>
                            </>
                        }
                    </div>}
            </div>

        </div >
    )
}

export default VoiceoverOwnScript;