import styles from "../ProjectsPage.module.scss";
import useWindowWidth from "hooks/useWindowWidth";
import ReactDOM from "react-dom";


const ProjectOverView = () => {
    const width = useWindowWidth();
    return (
        <>
            {width > 768 &&
                ReactDOM.createPortal(
                    <div className={styles.overview}>
                        <div className={styles.overview_container}>
                            <div className={styles.overview_header}>
                                <div>#0123456 </div>
                                <div className={styles.overview_header_divider}></div>
                                <div>Why They Chose Us: Honest feedback from our clients</div>
                            </div>
                            <div className={styles.overview_info}>
                                <div className={styles.overview_info_image}>

                                </div>
                                <div className={styles.overview_info_content}>
                                    <div className={styles.overview_info_content_item} >
                                        <div className={styles.overview_info_content_item_header} >Request type:</div>
                                    </div>
                                    <div className={styles.overview_info_content_item}>
                                        <div className={styles.overview_info_content_item_header}>Credit usage:</div></div>
                                    <div className={styles.overview_info_content_item}>
                                        <div className={styles.overview_info_content_item_header}>Status:</div></div>
                                    <div className={styles.overview_info_content_item}>
                                        <div className={styles.overview_info_content_item_header}>Requested by:</div>
                                    </div>
                                    <div className={styles.overview_info_content_item}>
                                        <div className={styles.overview_info_content_item_header}>Review link:</div>
                                    </div>
                                    <div className={styles.overview_info_content_item}>
                                        <div className={styles.overview_info_content_item_header}>Download link:</div>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <div>Request</div>
                                        <div>line</div>
                                    </div>
                                    <div>28 Dec 2024, 16:40</div>
                                </div>
                                <div>
                                    <div>
                                        <div>Shoot</div>
                                        <div>line</div>
                                    </div>
                                    <div>30 Dec 2024, 15:30</div>
                                </div>
                                <div>
                                    <div>
                                        <div>Edit</div>
                                        <div>line</div>
                                    </div>
                                    <div>6 Jan 2025, 16:40</div>
                                </div>
                                <div>
                                    <div>
                                        <div>Complete</div>
                                        <div>line</div>
                                    </div>
                                    <div>10 Jan 2025, 11:15</div>
                                </div>
                            </div>
                            <div>
                                <div>Overview</div>
                                <div>Project </div>
                                <div>Logistics</div>
                                <div>Candid Interview</div>
                                <div>Scripted Delivery</div>
                                <div>Voiceover</div>
                                <div>Video Edit</div>
                            </div>

                        </div>
                    </div>,
                    document.body,
                )}
        </>
    )
}

export default ProjectOverView;