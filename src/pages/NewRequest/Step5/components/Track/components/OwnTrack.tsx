import { CheckBox, Audio, CheckBoxSelected, DeleteAudio, Download, Expand } from "assets/images";
import { DEFAULT, TRACK_AUTHOR_CLIENT } from "consts/consts";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../../../redux/requests/reducer";

import styles from "../../../../NewRequest.module.scss";
interface IProps {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    isError: {
        track: boolean,
    },
}
const OwnTrack = ({
    isExpanded, setIsExpanded, isError,
}: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);
    const selection = selectedRequest?.voiceTrackSettings.trackAuthor;
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleUpdateField = (path: string, value: string | File | typeof DEFAULT) => {
        dispatch(
            updateDraftField({
                path,
                value,
            })
        );
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];

        if (uploadedFile) {
            const allowedExtensions = ['audio/mpeg', 'audio/wav', 'audio/aiff'];
            if (allowedExtensions.includes(uploadedFile.type)) {
                setError(null);
                setFile(uploadedFile);
                handleUpdateField("voiceTrackSettings.track", uploadedFile);
            } else {
                setError('Файл повинен бути формату MP3, WAV або AIFF');
                setFile(null);
            }
        }
    };
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const dispatch = useDispatch();
    const handleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        handleUpdateField("voiceTrackSettings.trackAuthor", TRACK_AUTHOR_CLIENT);
        setIsExpanded(!isExpanded);
    }



    return <div
        className={`
    ${styles.box}
    ${selection === TRACK_AUTHOR_CLIENT ? styles.box_selected : ""} 
    ${isExpanded ? styles.box_expanded : ""}`}
        onClick={() => {
            handleUpdateField("voiceTrackSettings.trackAuthor", TRACK_AUTHOR_CLIENT);
            setIsExpanded(true);
        }}
    >
        <div
            className={styles.box_header}
        >
            <img
                className={styles.box_circle}
                src={selection === TRACK_AUTHOR_CLIENT ? CheckBoxSelected : CheckBox}
                alt="CheckBox"
            />
            <span className={styles.box_title}>
                We'll provide the voice track
            </span>
            <div className={styles.box_title2} >
                We will upload the voice track in MP3 or MP4 format.
            </div>
        </div>
        <div className={styles.box_container}>
            <div className={styles.box_title}>Upload a high quality voice track:</div>
            <div className={styles.box_title2} style={{ whiteSpace: 'wrap' }}>Please upload high quality, uncompressed audio files (e.g., WAV or AIFF).
                MP3 files are acceptable but are lower quality.</div>
            <div>
                <input
                    type="file"
                    accept=".mp3, .wav, .aiff"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {file && <div className={styles.box_audioFile}>
                    <img src={Audio} alt='' />
                    <div style={{ flex: 1 }}>
                        <div>{file.name}</div>
                        <div>{Number(file.size / 1000000).toFixed(2)} mb</div>
                    </div>
                    <img onClick={() => {
                        setFile(null)
                        handleUpdateField("voiceTrackSettings.track", DEFAULT)
                    }
                    } src={DeleteAudio} alt='' />
                </div>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div
                    onClick={handleDivClick}
                    className={styles.box_audioFileButton}

                >
                    <img src={Download} alt="Download icon" style={{ width: '24px', height: '24px' }} />
                    <span style={{ color: isError.track ? 'var(--red-dark)' : '' }}>Upload WAV or MP3 file</span>
                </div>

            </div>
        </div>
        <img
            onClick={(e) => handleExpand(e)}
            src={Expand}
            alt="Expand"
            className={styles.box_expand}
        />
    </div >
        ;
};

export default OwnTrack;