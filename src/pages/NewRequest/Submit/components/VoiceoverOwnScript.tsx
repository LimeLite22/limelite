
import { CloseRed, EditIcon, StatusApproved, StatusProgress, StatusUnavailable, Success2, Audio, Delete, Download, StatusApprovedBlack, StatusProgressBlack, StatusUnavailableBlack } from "assets/images";
import { APPROVED_TEXT_STATUS, DEFAULT, IN_PROGRESS_TEXT_STATUS, OWN_SCRIPT, PROFESSIONAL_SCRIPT, TRACK_AUTHOR_CLIENT, TRACK_AUTHOR_PROFESSIONAL, UNAVAILABLE_TEXT_STATUS } from "consts/consts";
import DivRowCount from "pages/NewRequest/components/TextArea";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateVoiceoverSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const VoiceoverOwnScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(selectedRequest!.voiceTrackSettings);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const readyToSave = () => {
        let ready = true;
        if (selectedRequest!.voiceTrackSettings.scriptAuthorOwnSettings.text !== current.scriptAuthorOwnSettings.text
            || selectedRequest!.voiceTrackSettings.scriptAuthorOwnSettings.scriptStatus !== current.scriptAuthorOwnSettings.scriptStatus
        ) {
            if (current.scriptAuthorOwnSettings.text?.length !== 0) {
                console.log('------')
                ready = true
            } else {
                console.log('1------')
                ready = false
            }

        } else {
            console.log('2------')
            ready = false
        }
        setIsReady(ready);
    }
    const handleOnEdit = () => {
        setIsEdit(true);
    }
    const handleDecline = () => {
        setIsEdit(false);
        setCurrent(selectedRequest!.voiceTrackSettings);
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];

        if (uploadedFile) {
            const allowedExtensions = ["audio/mpeg", "audio/wav", "audio/aiff"];
            if (allowedExtensions.includes(uploadedFile.type)) {
                setError(null);
                setCurrent({ ...current, track: uploadedFile })
            } else {
                setError("Файл повинен бути формату MP3, WAV або AIFF");
                setCurrent({ ...current, track: DEFAULT })
            }
        }
    };
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };
    const handleSave = () => {
        if (!isReady) return


        dispatch(
            updateVoiceoverSettings({
                voiceTrackSettings: current,
                isEdit: false
            }
            )
        )
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [current, selectedRequest?.voiceTrackSettings])
    useEffect(() => {
        setCurrent(selectedRequest!.voiceTrackSettings)
    }, [selectedRequest?.voiceTrackSettings])
    if (selectedRequest?.voiceTrackSettings.scriptAuthor === PROFESSIONAL_SCRIPT) return null
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
            <div className={styles.infoContainer_text}><p>Track author</p>{current.trackAuthor}</div>
            {current.trackAuthor === TRACK_AUTHOR_CLIENT &&
                <div className={styles.infoContainer_text}>
                    <p>Track:</p>
                    {isEdit ? <div className={`${styles.box_container} ${styles.box_container_submit}`}>
                        {current.track === DEFAULT &&
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
                        {current.track !== DEFAULT && (
                            <div className={`${styles.box_audioFile} ${styles.box_audioFile_submit}`}>
                                <img src={Audio} alt="" />
                                <div style={{ flex: 1 }}>
                                    <div>{current.track?.name}</div>
                                    <div>{current.track?.size && Number(current.track?.size / 1000000).toFixed(2)} mb</div>
                                </div>
                                <img
                                    onClick={() => {
                                        setCurrent({ ...current, track: DEFAULT })
                                    }}
                                    src={Delete}
                                    alt=""
                                />
                            </div>
                        )}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {current.track === DEFAULT &&
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
                            <div className={styles.box_audioFileSubmit_text}>{current.track !== DEFAULT && current.track?.name}</div>
                            <div className={styles.box_audioFileSubmit_text}>{current.track !== DEFAULT && current.track?.size && Number(current.track?.size / 1000000).toFixed(2)} mb</div>
                        </div>
                    </div>

                    }

                </div>}
            {current.scriptAuthor === OWN_SCRIPT &&
                <>
                    <div className={styles.infoContainer_text}><p>Script Status:</p>
                        {isEdit ?
                            <div className={styles.infoContainer_statuses}>
                                <div
                                    className={`${styles.box_status} ${current.scriptAuthorOwnSettings.scriptStatus === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        setCurrent({ ...current, scriptAuthorOwnSettings: { ...current.scriptAuthorOwnSettings, scriptStatus: APPROVED_TEXT_STATUS } })
                                    }}
                                >
                                    <img src={current.scriptAuthorOwnSettings.scriptStatus === APPROVED_TEXT_STATUS ? StatusApprovedBlack : StatusApproved} alt="status" />
                                    {APPROVED_TEXT_STATUS}
                                </div>
                                <div
                                    className={`${styles.box_status} ${current.scriptAuthorOwnSettings.scriptStatus === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        setCurrent({ ...current, scriptAuthorOwnSettings: { ...current.scriptAuthorOwnSettings, scriptStatus: IN_PROGRESS_TEXT_STATUS } })
                                    }}
                                >
                                    <img src={current.scriptAuthorOwnSettings.scriptStatus === IN_PROGRESS_TEXT_STATUS ? StatusProgressBlack : StatusProgress} alt="status" />
                                    In Progress
                                </div>
                                <div
                                    className={`${styles.box_status} ${current.scriptAuthorOwnSettings.scriptStatus === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        setCurrent({ ...current, scriptAuthorOwnSettings: { ...current.scriptAuthorOwnSettings, scriptStatus: UNAVAILABLE_TEXT_STATUS } })
                                    }}
                                >
                                    <img src={current.scriptAuthorOwnSettings.scriptStatus === UNAVAILABLE_TEXT_STATUS ? StatusUnavailableBlack : StatusUnavailable} alt="status" />
                                    {UNAVAILABLE_TEXT_STATUS}
                                </div>
                            </div> : current.scriptAuthorOwnSettings.scriptStatus}
                    </div>
                    <div className={styles.infoContainer_text}><p className={`
                ${styles.infoContainer_detailsHeader}
                `}
                    >Script:</p>
                        {isEdit ?
                            <textarea className={styles.infoContainer_textarea}
                                onChange={(e) => setCurrent({
                                    ...current,
                                    scriptAuthorOwnSettings: {
                                        ...current.scriptAuthorOwnSettings,
                                        text: e.target.value
                                    }
                                })}
                                value={current.scriptAuthorOwnSettings.text} /> :
                            <DivRowCount text={current.scriptAuthorOwnSettings.text} />
                        }
                    </div>
                </>}

        </div >
    )
}

export default VoiceoverOwnScript;