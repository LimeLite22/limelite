import { DEFAULT, VIDEO_SQUARE, VIDEO_STANDARD, VIDEO_VERTICAL } from "consts/consts";
import { IVideoSettings } from "interfaces/interfaces";

import { testRequest } from "../../../redux/requests/consts";
import styles from "../ProjectsPage.module.scss";
const VideoEditSettings = () => {
    const videoSettings: IVideoSettings = testRequest.videoSettings;

    const formatNumber =
        videoSettings?.format === VIDEO_STANDARD
            ? '16:9' : videoSettings?.format === VIDEO_SQUARE
                ? '1:1' : videoSettings?.format === VIDEO_VERTICAL
                    ? "4:5" : "9:16"


    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Video edit
            </div>
            <div className={styles.infoContainer_text}>
                <p>Video format:</p>
                <div>
                    {videoSettings?.format} ({formatNumber})
                </div>

            </div>
            <div className={styles.infoContainer_text}>
                <p>Target duration :</p>
                <div>
                    {videoSettings?.targetDuration}
                </div>
            </div>
            <div className={styles.infoContainer_text}>
                <p>Captions :</p>
                <div>
                    {videoSettings?.captions ? "Yes" : "No"}
                </div>

            </div>
            <div className={styles.infoContainer_text}>
                <p> Thumbnail :</p>
                <div>
                    {videoSettings?.thumbnail}
                </div>

            </div>

            <div className={styles.infoContainer_text}>
                <p>Additional/social formats:</p>
                <div>
                    {
                        videoSettings?.additionalFormats ?

                            videoSettings?.selectedAdditionalFormats?.map((item, index) => {
                                return (
                                    `${item.format} (${item.duration}) ${index + 1 === videoSettings?.selectedAdditionalFormats?.length ? "" : ","}`
                                )
                            })
                            : 'No'
                    }
                </div>
            </div>
            <div className={styles.infoContainer_text}>
                <p> Additional visual assets:</p>
                <div>

                    {videoSettings.additionalVisualAssetUrl ? videoSettings?.additionalVisualAssetUrl : 'No URL'}
                    /
                    {videoSettings?.additionalVisualAssetFile !== DEFAULT ? videoSettings?.additionalVisualAssetFile?.name : 'No file'}
                </div>
            </div>
            <div className={styles.infoContainer_text}>
                <p>Turnaround</p> {videoSettings?.resultTime}</div>

        </div >
    )
}

export default VideoEditSettings;