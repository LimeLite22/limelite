
import { Add2, CloseRed, Delete, Drop, EditIcon, PNG, Success2, } from "assets/images";
import { BASIC_THUMBNAIL, CUSTOM_THUMBNAIL, DEFAULT, NO_THUMBNAIL, RUSH_TIME, VIDEO_SQUARE, VIDEO_STANDARD, VIDEO_STORY, VIDEO_VERTICAL } from "consts/consts";
import { IVideoSettings } from "interfaces/interfaces";
import AdditionalFormatItem from "pages/NewRequest/VideoEdit/components/AdditionalFormats/components/AdditionalFormatItem";
import DurationSelector from "pages/NewRequest/VideoEdit/components/DurationSelector/DurationSelector";
import { useEffect, useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import { useDispatch, useSelector } from "react-redux";
import { generateUniqueId } from "utils/generateId";
import { getFormatNumber } from "utils/getFormatNubmers";

import { selectRequestInfo, updateVideoEditSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import RushTimeSelector from "./RushTimeSubmitSelector/RushTimeSelector";
const VideoEdit = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const videoSettings: IVideoSettings = selectedRequest!.videoSettings;
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(videoSettings);


    const readyToSave = () => {
        let ready = true;
        if (current.additionalFormats !== videoSettings?.additionalFormats ||
            current.additionalVisualAssetFile !== videoSettings?.additionalVisualAssetFile ||
            current.format !== videoSettings?.format ||
            current.targetDuration !== videoSettings?.targetDuration ||
            current.thumbnail !== videoSettings?.thumbnail ||
            current.additionalVisualAssetUrl !== videoSettings?.additionalVisualAssetUrl ||
            current.selectedAdditionalFormats !== videoSettings?.selectedAdditionalFormats ||
            current.captions !== videoSettings?.captions ||
            current.resultTime !== videoSettings?.resultTime ||
            current.time !== videoSettings?.time
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
        setCurrent(videoSettings);
    }
    const handleSave = () => {
        if (!isReady) return
        current && dispatch(updateVideoEditSettings({
            videoSettings: current,
            isEdit: false
        }))
        setIsEdit(false);
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setCurrent({ ...current, additionalVisualAssetFile: uploadedFile })
        }
    };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };
    const handleAddFormat = () => {
        if (current?.additionalFormats) {
            const newFormats = [...current?.selectedAdditionalFormats];
            newFormats.push({ id: generateUniqueId(), duration: DEFAULT, format: DEFAULT });
            setCurrent({ ...current, selectedAdditionalFormats: newFormats })
        }
    }

    useEffect(() => {
        readyToSave();
    }, [current])
    useEffect(() => {
        setCurrent(videoSettings)
    }, [selectedRequest])
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Video edit
                {!isEdit ?
                    <div className={styles.infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div> : <div className={styles.infoContainer_header_editMode}>edit mode</div>}
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
                    ${current?.format === VIDEO_STANDARD ? styles.box_videoTypeSelected : ""} 
                    ${styles.box_videoType}`}
                        >
                            Standard <div className={styles.box_videoType_dot}></div> 16:9
                        </div>
                        <div
                            onClick={() => {
                                setCurrent({ ...current, format: VIDEO_STORY });
                            }}
                            className={`
                    ${current?.format === VIDEO_STORY ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`}
                        >
                            Story <div className={styles.box_videoType_dot}></div> 9:16
                        </div>
                        <div
                            onClick={() => {
                                setCurrent({ ...current, format: VIDEO_SQUARE });
                            }}
                            className={`
                    ${current?.format === VIDEO_SQUARE ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`}
                        >
                            Square <div className={styles.box_videoType_dot}></div> 1:1
                        </div>
                        <div
                            onClick={() => {
                                setCurrent({ ...current, format: VIDEO_VERTICAL });
                            }}
                            className={`    
                    ${current?.format === VIDEO_VERTICAL ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`}
                        >
                            Vertical <div className={styles.box_videoType_dot}></div> 4:5
                        </div>
                    </div> : <div>
                        {videoSettings?.format} ({getFormatNumber(videoSettings?.format)})
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
                    style={{ background: current?.captions ? "var(--green-dark)" : "" }}
                    onClick={() => {
                        setCurrent({ ...current, captions: !current?.captions })
                    }}
                >
                    <div
                        className={`${styles.switcher_circle} ${current?.captions ? styles.switcher_circle_active : ""}`}
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
                            ${current?.thumbnail === NO_THUMBNAIL ? styles.infoContainer_thumbnail_selected : ""} 
                            ${styles.infoContainer_thumbnail}`}
                            onClick={() => {
                                setCurrent({ ...current, thumbnail: NO_THUMBNAIL })
                            }}
                        >No thumbnail</div>
                        <div
                            className={`
                            ${current?.thumbnail === BASIC_THUMBNAIL ? styles.infoContainer_thumbnail_selected : ""} 
                            ${styles.infoContainer_thumbnail}`}
                            onClick={() => {
                                setCurrent({ ...current, thumbnail: BASIC_THUMBNAIL })
                            }}
                        >Basic</div>
                        <div className={`
                            ${current?.thumbnail === CUSTOM_THUMBNAIL ? styles.infoContainer_thumbnail_selected : ""} 
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
                <p>Additional/social formats:</p>
                {isEdit ?
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <div className={styles.videoFormat}>
                            {current?.selectedAdditionalFormats?.map(
                                (item, index) => {
                                    return (
                                        <AdditionalFormatItem key={item.id} item={item} index={index} isError={false}
                                            onChange={(duration, format) => {
                                                if (current?.additionalFormats) {
                                                    const newFormats = [...current?.selectedAdditionalFormats];
                                                    newFormats[index] = { ...newFormats[index], duration, format };
                                                    setCurrent({ ...current, selectedAdditionalFormats: newFormats })
                                                }

                                            }}
                                            onDelete={(index) => {
                                                if (current?.additionalFormats) {
                                                    const newFormats = [...current?.selectedAdditionalFormats];
                                                    newFormats.splice(index, 1);
                                                    setCurrent({ ...current, selectedAdditionalFormats: newFormats })
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
                        {
                            videoSettings?.additionalFormats ?

                                videoSettings?.selectedAdditionalFormats?.map((item, index) => {
                                    return (
                                        `${item.format} (${item.duration}) ${index + 1 === videoSettings?.selectedAdditionalFormats?.length ? "" : ","}`
                                    )
                                })
                                : 'No'
                        }
                    </div>}
            </div>
            <div className={styles.infoContainer_text}>
                <p> Additional visual assets:</p>
                {isEdit ?
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        {current.additionalVisualAssetFile === DEFAULT &&
                            <>
                                <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>

                                    <FileDrop
                                        className={`
                                ${styles.box_drop} 
                                ${styles.box_drop_submit} 
                                `}
                                        onDrop={(files, event) => {
                                            if (files && files[0]) {
                                                setCurrent({ ...current, additionalVisualAssetFile: files[0] })
                                            }
                                        }}
                                    >
                                        <img className={styles.box_drop_icon} src={Drop} alt="Drop" />
                                        <div className={`${styles.box_drop_text} ${styles.box_drop_text_submit}`}>
                                            Drag & Drop or <span onClick={handleDivClick}>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ display: "none" }}
                                                    onChange={handleFileChange}
                                                />
                                                Choose file </span>to upload
                                        </div>
                                        <div className={styles.box_drop_text2}>AI, SVG or PNG </div>
                                    </FileDrop>
                                </div>
                                <div className={styles.box_drop_divider}>
                                    <div className={styles.box_drop_dividerLine}></div>
                                    or
                                    <div className={styles.box_drop_dividerLine}></div>
                                </div>
                            </>
                        }
                        <div className={styles.box_drop_title}>Import from URL</div>
                        <input type="text" className={styles.box_drop_input}
                            onChange={(e) => {
                                setCurrent({ ...current, additionalVisualAssetUrl: e.target.value })
                            }}
                            // style={{ border: isError.url ? "1px solid var(--red-dark)" : "" }}
                            placeholder="Add file URL" />
                        {current.additionalVisualAssetFile !== DEFAULT && <div className={styles.box_file}>
                            <div className={styles.box_file_content}>
                                <img src={PNG} alt="PNG" />
                                <div >
                                    <div className={styles.box_file_header}>{current.additionalVisualAssetFile?.name}</div>
                                    <div className={styles.box_file_text}>{Number(current.additionalVisualAssetFile.size / 1000000).toFixed(2)} mb</div>
                                </div>
                            </div>
                            <img onClick={() => {
                                setCurrent((prev) => ({ ...prev, visualAssetFile: DEFAULT }))

                            }} src={Delete} alt="Delete" />
                        </div>}
                    </div>
                    : <div>

                        {current?.additionalVisualAssetUrl ? current?.additionalVisualAssetUrl : 'No URL'}
                        /
                        {current?.additionalVisualAssetFile !== DEFAULT ? current?.additionalVisualAssetFile?.name : 'No file'}
                    </div>}
            </div>
            {!isEdit &&
                <div className={styles.infoContainer_text}>
                    <p>Turnaround</p> {current?.resultTime}</div>

            }
            {isEdit && current?.resultTime === RUSH_TIME &&
                <div className={styles.infoContainer_text}>
                    <p>Turnaround</p>
                    <RushTimeSelector onChange={(e) => {
                        setCurrent({ ...current, time: e });
                    }}
                        isEdit={true}
                    />
                </div>
            }
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

export default VideoEdit;