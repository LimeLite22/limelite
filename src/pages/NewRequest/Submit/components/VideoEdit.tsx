
import { Add2, CloseRed, EditIcon, Success2, } from "assets/images";
import { BASIC_THUMBNAIL, CUSTOM_THUMBNAIL, DEFAULT, NO_THUMBNAIL, VIDEO_SQUARE, VIDEO_STANDARD, VIDEO_STORY, VIDEO_VERTICAL } from "consts/consts";
import AdditionalFormatItem from "pages/NewRequest/VideoEdit/components/AdditionalFormats/components/AdditionalFormatItem";
import DurationSelector from "pages/NewRequest/VideoEdit/components/DurationSelector/DurationSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateUniqueId } from "utils/generateId";

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
        thumbnail: videoSettings?.thumbnail,
        additionalFormats: videoSettings?.selectedAdditionalFormats
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
        dispatch(
            updateDraftField({
                path: "videoSettings.selectedAdditionalFormats",
                value: current.additionalFormats,
            }),
        );
        setCurrent(defaultState);
        setIsEdit(false);
    }
    const handleAddFormat = () => {
        if (current?.additionalFormats) {
            const newFormats = [...current?.additionalFormats];
            newFormats.push({ id: generateUniqueId(), duration: DEFAULT, format: DEFAULT });
            setCurrent({ ...current, additionalFormats: newFormats })
        }
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

            <div className={styles.infoContainer_text}>
                <p>Additional/social formats</p>
                {isEdit ?
                    <div>
                        <div className={styles.videoFormat}>
                            {current?.additionalFormats?.map(
                                (item, index) => {
                                    return (
                                        <AdditionalFormatItem key={item.id} item={item} index={index} isError={false}
                                            onChange={(duration, format) => {
                                                if (current?.additionalFormats) {
                                                    const newFormats = [...current?.additionalFormats];
                                                    newFormats[index] = { ...newFormats[index], duration, format };
                                                    setCurrent({ ...current, additionalFormats: newFormats })
                                                }

                                            }}
                                            onDelete={(index) => {
                                                if (current?.additionalFormats) {
                                                    const newFormats = [...current?.additionalFormats];
                                                    newFormats.splice(index, 1);
                                                    setCurrent({ ...current, additionalFormats: newFormats })
                                                }
                                            }}
                                        />
                                    );
                                },
                            )}
                        </div>
                        <div
                            className={styles.videoFormat_addFormat}
                            onClick={handleAddFormat}
                        >
                            <img src={Add2} alt="locationIcon" /> Add an additional format
                        </div>
                    </div>
                    : <div>
                        {videoSettings?.selectedAdditionalFormats?.map((item, index) => {
                            return (
                                `${item.format} (${item.duration}) ${index + 1 === videoSettings?.selectedAdditionalFormats?.length ? "" : ","}`
                            )
                        })}
                    </div>}
            </div>

        </div >
    )
}

export default VideoEdit;