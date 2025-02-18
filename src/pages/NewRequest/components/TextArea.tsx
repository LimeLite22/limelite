import { ArrowBlue3 } from "assets/images";
import { useState, useRef, useEffect } from "react";
import styles from "../NewRequest.module.scss";

const DivRowCount = ({ text }: { text: string }) => {
    const [rows, setRows] = useState(1);
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (divRef.current) {
            const div = divRef.current;
            const lineHeight = parseInt(getComputedStyle(div).lineHeight, 10);
            const rowCount = Math.floor(div.scrollHeight / lineHeight);
            setRows(rowCount);
        }
    }, [text]);

    return (
        <div style={{ position: 'relative' }}>
            <div
                ref={divRef}
                className={`
                    ${styles.infoContainer_details} 
                    ${isDetailsExpanded ? styles.infoContainer_details_expanded : ''}`}
                style={{ height: !isDetailsExpanded ? (rows > 3 ? 3 : rows) * 20 + 'px' : '' }}
            >
                {text}
            </div>
            {rows > 2 &&
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
                        <>{isDetailsExpanded ? "Show less" : "Show more"}<img src={ArrowBlue3} alt='' /></>

                    </div>
                </>
            }
        </div>
    );
};

export default DivRowCount;

