import { Audio, CloseRed, Delete, Download, EditIcon, Success2 } from "assets/images";
import { DEFAULT, TRACK_AUTHOR_CLIENT } from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateVoiceoverSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const Voiceover = () => {
    const voiceTrackSettings = useSelector(selectRequestInfo)?.voiceTrackSettings!;
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(voiceTrackSettings);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const readyToSave = () => {
        let ready = true;
        if (
            current?.trackAuthor !== voiceTrackSettings?.trackAuthor ||
            (current?.trackAuthor === TRACK_AUTHOR_CLIENT && current.track === DEFAULT)
        ) {
            ready = false
        } else {
            if (current?.track !== voiceTrackSettings?.track) {
                ready = true
            } else {
                ready = false
            }

        }

        setIsReady(ready);
    }
    const handleOnEdit = () => {
        setIsEdit(true);
    }
    const handleDecline = () => {
        setIsEdit(false);
        setCurrent(voiceTrackSettings);
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
    }, [current, voiceTrackSettings])
    useEffect(() => {
        setCurrent(voiceTrackSettings)
    }, [voiceTrackSettings])


    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>About Your Voiceover
                {!isEdit ?
                    <div className={styles.infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div> : <div className={styles.infoContainer_header_editMode}>edit mode</div>}
            </div>
            <div className={styles.infoContainer_text}><p>Track author:</p>{current.trackAuthor}</div>
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

        </div >
    )
}

export default Voiceover;