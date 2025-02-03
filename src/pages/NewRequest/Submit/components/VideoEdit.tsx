
import { CloseRed, EditIcon, Success2, } from "assets/images";
import { BASIC_THUMBNAIL, CUSTOM_THUMBNAIL, DEFAULT, NO_THUMBNAIL, VIDEO_SQUARE, VIDEO_STANDARD, VIDEO_STORY, VIDEO_VERTICAL } from "consts/consts";
import DurationSelector from "pages/NewRequest/VideoEdit/components/DurationSelector/DurationSelector";
import NoThumbnail from "pages/NewRequest/VideoEdit/components/Thumbnail/components/NoThumbnail";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const VideoEdit = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const videoSettings = selectedRequest?.videoSettings;
    const defaultState = {
        format: videoSettings?.format,
        targetDuration: videoSettings?.targetDuration,
        captions: videoSettings?.captions,
        thumbnail: videoSettings?.thumbnail
    }
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(defaultState);
    const formatNumber =
        videoSettings?.format === VIDEO_STANDARD
            ? '16:9' : videoSettings?.format === VIDEO_SQUARE
                ? '1:1' : videoSettings?.format === VIDEO_VERTICAL
                    ? "4:5" : "9:16"


    const readyToSave = () => {
        let ready = true;
        if (current.format !== videoSettings?.format
            || current.targetDuration !== videoSettings?.targetDuration
            || current.captions !== videoSettings?.captions
            || current.thumbnail !== videoSettings?.thumbnail
        ) {
            ready = true

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
        if (!isReady) return
        dispatch(
            updateDraftField({
                path: "videoSettings.format",
                value: current.format,
            }),
        );
        dispatch(
            updateDraftField({
                path: "videoSettings.targetDuration",
                value: current.targetDuration,
            }),
        );
        dispatch(
            updateDraftField({
                path: "videoSettings.captions",
                value: current.captions,
            }),
        );
        dispatch(
            updateDraftField({
                path: "videoSettings.thumbnail",
                value: current.thumbnail,
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
            <div className={styles.infoContainer_header}>Video edit

                {!isEdit &&
                    <div className={styles.infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div>}
                {isEdit &&
                    <div className={styles.infoContainer_header_buttons}>
                        <div
                            className={styles.infoContainer_header_decline}
                            onClick={handleDecline}><img src={CloseRed} alt='' />Decline</div>
                        <div
                            className={`
                            ${styles.infoContainer_header_save}
                            ${!isReady ? styles.infoContainer_header_save_notReady : ''}
                            `}
                            onClick={handleSave}
                        ><img src={Success2} alt='' /> Save changes</div>
                    </div>}
            </div>
            <div className={styles.infoContainer_text}>
                <p>Video format:</p>
                {isEdit ?
                    <div className={styles.box_videTypes}>
                        <div
                            onClick={() => {
                                setCurrent({ ...current, format: VIDEO_STANDARD });

                            }}
                            className={`
                    ${current.format === VIDEO_STANDARD ? styles.box_videoTypeSelected : ""} 
                    ${styles.box_videoType}`}
                        >
                            Standard <div className={styles.box_videoType_dot}></div> 16:9
                        </div>
                        <div
                            onClick={() => {
                                setCurrent({ ...current, format: VIDEO_STORY });
                            }}
                            className={`
                    ${current.format === VIDEO_STORY ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`}
                        >
                            Story <div className={styles.box_videoType_dot}></div> 9:16
                        </div>
                        <div
                            onClick={() => {
                                setCurrent({ ...current, format: VIDEO_SQUARE });
                            }}
                            className={`
                    ${current.format === VIDEO_SQUARE ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`}
                        >
                            Square <div className={styles.box_videoType_dot}></div> 1:1
                        </div>
                        <div
                            onClick={() => {
                                setCurrent({ ...current, format: VIDEO_VERTICAL });
                            }}
                            className={`    
                    ${current.format === VIDEO_VERTICAL ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`}
                        >
                            Vertical <div className={styles.box_videoType_dot}></div> 4:5
                        </div>
                    </div> : <div>
                        {videoSettings?.format} ({formatNumber})
                    </div>

                }

            </div>
            <div className={styles.infoContainer_text}>
                <p>Target duration :</p>
                {isEdit ? <DurationSelector isSubmit value={current?.targetDuration || DEFAULT} onChange={(e) => {
                    setCurrent({ ...current, targetDuration: e })
                }} /> : <div>
                    {videoSettings?.targetDuration}
                </div>

                }

            </div>
            <div className={styles.infoContainer_text}>
                <p>Captions :</p>
                {isEdit ? <div
                    className={styles.switcher}
                    style={{ background: current.captions ? "var(--green-dark)" : "" }}
                    onClick={() => {
                        setCurrent({ ...current, captions: !current.captions })
                    }}
                >
                    <div
                        className={`${styles.switcher_circle} ${current.captions ? styles.switcher_circle_active : ""}`}
                    ></div>
                </div> : <div>
                    {videoSettings?.captions ? "Yes" : "No"}
                </div>

                }

            </div>
            <div className={styles.infoContainer_text}>
                <p> Thumbnail :</p>
                {isEdit ?
                    <div className={styles.infoContainer_thumbnails} >
                        <div className={`
                            ${current.thumbnail === NO_THUMBNAIL ? styles.infoContainer_thumbnail_selected : ""} 
                            ${styles.infoContainer_thumbnail}`}
                            onClick={() => {
                                setCurrent({ ...current, thumbnail: NO_THUMBNAIL })
                            }}
                        >No thumbnail</div>
                        <div
                            className={`
                            ${current.thumbnail === BASIC_THUMBNAIL ? styles.infoContainer_thumbnail_selected : ""} 
                            ${styles.infoContainer_thumbnail}`}
                            onClick={() => {
                                setCurrent({ ...current, thumbnail: BASIC_THUMBNAIL })
                            }}
                        >Basic</div>
                        <div className={`
                            ${current.thumbnail === CUSTOM_THUMBNAIL ? styles.infoContainer_thumbnail_selected : ""} 
                            ${styles.infoContainer_thumbnail}
                        `}
                            onClick={() => {
                                setCurrent({ ...current, thumbnail: CUSTOM_THUMBNAIL })
                            }}
                        >Custom</div>
                    </div> : <div>
                        {videoSettings?.thumbnail}
                    </div>

                }

            </div>
            {/* 
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
            </div> */}

        </div >
    )
}

export default VideoEdit;