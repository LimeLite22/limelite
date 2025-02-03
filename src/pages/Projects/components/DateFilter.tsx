import { CheckBox, CheckBoxSelected, CloseRed, LastDays } from "assets/images";
import { CURRENT_MONTH_RANGE, CURRENT_YEAR_RANGE, DEFAULT, LAST_12_MONTHS, LAST_30_DAYS, LAST_WEEK_RANGE } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import { TRange } from "types/types";
import { getDatesInRange } from "utils/dateRange";

import styles from "../ProjectsPage.module.scss";

interface IProps {
    dateRange: TRange;
    setDateRange: React.Dispatch<React.SetStateAction<TRange>>;
}

const DateFilter = ({ dateRange, setDateRange }: IProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const width = useWindowWidth();
    return (
        <div className={styles.projectsPage_lastDays} tabIndex={0} onClick={() => setIsOpened(true)} onBlur={() => width > 990 && setIsOpened(false)}><img src={LastDays} alt="filter" /> {dateRange !== DEFAULT ? dateRange : 'Date range'} {dateRange !== DEFAULT && <img src={CloseRed} alt="filter" onClick={(e) => {
            e.stopPropagation();
            setIsOpened(false);
            setDateRange(DEFAULT);
        }} />}
            {width > 990 && isOpened && <div className={styles.projectsPage_lastDays_container}>
                <div className={styles.projectsPage_lastDays_container_item} onClick={() => setDateRange(LAST_WEEK_RANGE)}>
                    <img src={dateRange === LAST_WEEK_RANGE ? CheckBoxSelected : CheckBox} alt="filter" />
                    <div className={styles.projectsPage_lastDays_container_item_info}>
                        <div className={styles.projectsPage_lastDays_container_item_text}>Last week </div>
                        <div className={styles.projectsPage_lastDays_container_item_title}> {getDatesInRange(LAST_WEEK_RANGE).startDate} - {getDatesInRange(LAST_WEEK_RANGE).endDate}</div>
                    </div>
                </div>
                <div className={styles.projectsPage_lastDays_container_item} onClick={() => setDateRange(CURRENT_MONTH_RANGE)}>
                    <img src={dateRange === CURRENT_MONTH_RANGE ? CheckBoxSelected : CheckBox} alt="filter" />
                    <div className={styles.projectsPage_lastDays_container_item_info}>
                        <div className={styles.projectsPage_lastDays_container_item_text}>Current month</div>
                        <div className={styles.projectsPage_lastDays_container_item_title}>{getDatesInRange(CURRENT_MONTH_RANGE).startDate} - {getDatesInRange(CURRENT_MONTH_RANGE).endDate}</div>
                    </div>
                </div>
                <div className={styles.projectsPage_lastDays_container_item} onClick={() => setDateRange(LAST_30_DAYS)} >
                    <img src={dateRange === LAST_30_DAYS ? CheckBoxSelected : CheckBox} alt="filter" />
                    <div className={styles.projectsPage_lastDays_container_item_info}>
                        <div className={styles.projectsPage_lastDays_container_item_text}>Last 30 days </div>
                        <div className={styles.projectsPage_lastDays_container_item_title}>{getDatesInRange(LAST_30_DAYS).startDate} - {getDatesInRange(LAST_30_DAYS).endDate}</div>
                    </div>
                </div>
                <div className={styles.projectsPage_lastDays_container_item} onClick={() => setDateRange(CURRENT_YEAR_RANGE)}>
                    <img src={dateRange === CURRENT_YEAR_RANGE ? CheckBoxSelected : CheckBox} alt="filter" />
                    <div className={styles.projectsPage_lastDays_container_item_info}>
                        <div className={styles.projectsPage_lastDays_container_item_text}>Current year </div>
                        <div className={styles.projectsPage_lastDays_container_item_title}>{getDatesInRange(CURRENT_YEAR_RANGE).startDate} - {getDatesInRange(CURRENT_YEAR_RANGE).endDate}</div>
                    </div>
                </div>
                <div className={styles.projectsPage_lastDays_container_item} onClick={() => setDateRange(LAST_12_MONTHS)}>
                    <img src={dateRange === LAST_12_MONTHS ? CheckBoxSelected : CheckBox} alt="filter" />
                    <div className={styles.projectsPage_lastDays_container_item_info}>
                        <div className={styles.projectsPage_lastDays_container_item_text}>Last 12 months </div>
                        <div className={styles.projectsPage_lastDays_container_item_title}>{getDatesInRange(LAST_12_MONTHS).startDate} - {getDatesInRange(LAST_12_MONTHS).endDate}</div>
                    </div>
                </div>

            </div>}
            {width < 990 && isOpened && (
                <>

                    <Sheet
                        isOpen={isOpened}
                        onClose={() => { setIsOpened(false) }}
                        className={styles.dateRange_sheetMain}
                        detent="full-height"
                    >
                        <div
                            className={styles.dateRange_closeArea2}
                            onClick={(e) => {
                                console.log('close');
                                e.stopPropagation();
                                setIsOpened(false)
                            }}
                        ></div>
                        <Sheet.Container className={styles.dateRange_sheet2}>
                            <Sheet.Content >
                                <div className={styles.dateRange_line}></div>
                                <div className={styles.dateRange_container}>
                                    <div className={styles.projectsPage_lastDays_container_item} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpened(false);
                                        setDateRange(LAST_WEEK_RANGE)
                                    }
                                    }>
                                        <img src={dateRange === LAST_WEEK_RANGE ? CheckBoxSelected : CheckBox} alt="filter" />
                                        <div className={styles.projectsPage_lastDays_container_item_info}>
                                            <div className={styles.projectsPage_lastDays_container_item_text}>Last week </div>
                                            <div className={styles.projectsPage_lastDays_container_item_title}> {getDatesInRange(LAST_WEEK_RANGE).startDate} - {getDatesInRange(LAST_WEEK_RANGE).endDate}</div>
                                        </div>
                                    </div>
                                    <div className={styles.projectsPage_lastDays_container_item} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpened(false);
                                        setDateRange(CURRENT_MONTH_RANGE)
                                    }}>
                                        <img src={dateRange === CURRENT_MONTH_RANGE ? CheckBoxSelected : CheckBox} alt="filter" />
                                        <div className={styles.projectsPage_lastDays_container_item_info}>
                                            <div className={styles.projectsPage_lastDays_container_item_text}>Current month</div>
                                            <div className={styles.projectsPage_lastDays_container_item_title}>{getDatesInRange(CURRENT_MONTH_RANGE).startDate} - {getDatesInRange(CURRENT_MONTH_RANGE).endDate}</div>
                                        </div>
                                    </div>
                                    <div className={styles.projectsPage_lastDays_container_item} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpened(false);
                                        setDateRange(LAST_30_DAYS)
                                    }} >
                                        <img src={dateRange === LAST_30_DAYS ? CheckBoxSelected : CheckBox} alt="filter" />
                                        <div className={styles.projectsPage_lastDays_container_item_info}>
                                            <div className={styles.projectsPage_lastDays_container_item_text}>Last 30 days </div>
                                            <div className={styles.projectsPage_lastDays_container_item_title}>{getDatesInRange(LAST_30_DAYS).startDate} - {getDatesInRange(LAST_30_DAYS).endDate}</div>
                                        </div>
                                    </div>
                                    <div className={styles.projectsPage_lastDays_container_item} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpened(false);
                                        setDateRange(CURRENT_YEAR_RANGE)
                                    }
                                    }>
                                        <img src={dateRange === CURRENT_YEAR_RANGE ? CheckBoxSelected : CheckBox} alt="filter" />
                                        <div className={styles.projectsPage_lastDays_container_item_info}>
                                            <div className={styles.projectsPage_lastDays_container_item_text}>Current year </div>
                                            <div className={styles.projectsPage_lastDays_container_item_title}>{getDatesInRange(CURRENT_YEAR_RANGE).startDate} - {getDatesInRange(CURRENT_YEAR_RANGE).endDate}</div>
                                        </div>
                                    </div>
                                    <div className={styles.projectsPage_lastDays_container_item} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpened(false);
                                        setDateRange(LAST_12_MONTHS)
                                    }}>
                                        <img src={dateRange === LAST_12_MONTHS ? CheckBoxSelected : CheckBox} alt="filter" />
                                        <div className={styles.projectsPage_lastDays_container_item_info}>
                                            <div className={styles.projectsPage_lastDays_container_item_text}>Last 12 months </div>
                                            <div className={styles.projectsPage_lastDays_container_item_title}>{getDatesInRange(LAST_12_MONTHS).startDate} - {getDatesInRange(LAST_12_MONTHS).endDate}</div>
                                        </div>
                                    </div>

                                </div>



                            </Sheet.Content>
                        </Sheet.Container>
                    </Sheet>
                </>
            )}
        </div>
    );
};

export default DateFilter;