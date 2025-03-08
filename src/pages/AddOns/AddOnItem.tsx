import { useState } from "react";
import styles from "./AddOns.module.scss";
import ReactDOM from "react-dom";
import { Sheet } from "react-modal-sheet";
import useWindowWidth from "hooks/useWindowWidth";
import { Close, DroneFoto1, DroneFoto2, DroneFoto3, DroneFoto4, Note } from "assets/images";

const AddOnItem = ({ item }: { item: { id: string; img: string; header: string; text: string; price: string; } }) => {
    const [isOpened, setIsOpened] = useState(false);
    const width = useWindowWidth();
    const [fotosList, setFotosList] = useState([
        DroneFoto1, DroneFoto2, DroneFoto3, DroneFoto4
    ])
    return (
        <>
            <div key={item.id} className={styles.page_list_item}>

                <img src={item.img} alt="" />
                <div className={styles.page_list_item_header}>{item.header}</div>
                <div className={styles.page_list_item_text}>{item.text}</div>
                <div className={styles.page_list_item_container}>
                    <div className={styles.credit}>{item.price}</div>
                    <div className={styles.page_list_item_button} onClick={() => setIsOpened(true)} >See details</div>
                </div>
            </div>
            {width < 768 && isOpened && (
                <Sheet
                    isOpen={isOpened}
                    onClose={() => setIsOpened(false)}
                    dragVelocityThreshold={500}
                    initialSnap={1}
                    detent="full-height"
                    style={{
                        backdropFilter: "blur(3px)",
                        WebkitBackdropFilter: "blur(3px)",
                        background: "#11100E99",
                    }}
                    className={styles.learnMore_sheetMain}
                >
                    <div
                        className={styles.learnMore_closeArea}
                        onClick={() => setIsOpened(false)}
                    ></div>
                    <Sheet.Container className={styles.learnMore_sheet}>
                        <Sheet.Content className={styles.learnMore_sheetContainer}>
                            <div className={styles.learnMore_container_line}></div>
                            <div className={styles.learnMore_container_header}>
                                {item.header}
                            </div>
                            <div className={styles.learnMore_container_fotoContainer}>
                                <img className={styles.learnMore_container_foto} src={fotosList[0]} alt="" />
                                <div className={styles.learnMore_container_fotos}>
                                    <img src={fotosList[1]} onClick={() => {
                                        setFotosList([fotosList[1], fotosList[0], fotosList[2], fotosList[3]])
                                    }} alt="" />
                                    <img src={fotosList[2]} onClick={() => {
                                        setFotosList([fotosList[2], fotosList[0], fotosList[1], fotosList[3]])
                                    }}
                                        alt="" />
                                    <img src={fotosList[3]}
                                        onClick={() => {
                                            setFotosList([fotosList[3], fotosList[0], fotosList[1], fotosList[2]])
                                        }}
                                        alt="" />
                                </div>
                            </div>
                            <div className={styles.learnMore_container_price}>Price:  <div className={styles.credit}>{item.price}</div><div className={styles.learnMore_container_price_each}>/each</div></div>
                            <div className={styles.learnMore_container_text}>{item.text}</div>
                            <div className={styles.learnMore_container_subText}>
                                <img src={Note} alt="locationIcon" /> Add-ons are discounted services that are only available to active monthly subscribers and subject to availability.
                            </div>
                        </Sheet.Content>
                    </Sheet.Container>
                </Sheet>
            )}
            {width > 768 &&
                isOpened &&
                ReactDOM.createPortal(
                    <div className={styles.learnMore}>
                        <div className={styles.learnMore_container}>
                            <div className={styles.learnMore_container_header}>
                                {item.header}
                            </div>

                            <div
                                onClick={() => setIsOpened(false)}
                                className={styles.learnMore_container_closeButton}
                            >
                                <img
                                    className={styles.learnMore_container_close}
                                    src={Close}
                                    alt="Close"
                                />
                            </div>
                            <div className={styles.learnMore_container_fotoContainer}>
                                <img className={styles.learnMore_container_foto} src={fotosList[0]} alt="" />
                                <div className={styles.learnMore_container_fotos}>
                                    <img src={fotosList[1]} onClick={() => {
                                        setFotosList([fotosList[1], fotosList[0], fotosList[2], fotosList[3]])
                                    }} alt="" />
                                    <img src={fotosList[2]} onClick={() => {
                                        setFotosList([fotosList[2], fotosList[0], fotosList[1], fotosList[3]])
                                    }}
                                        alt="" />
                                    <img src={fotosList[3]}
                                        onClick={() => {
                                            setFotosList([fotosList[3], fotosList[0], fotosList[1], fotosList[2]])
                                        }}
                                        alt="" />
                                </div>
                            </div>
                            <div className={styles.learnMore_container_price}>Price:  <div className={styles.credit}>{item.price}</div></div>
                            <div className={styles.learnMore_container_text}>{item.text}</div>
                            <div className={styles.learnMore_container_subText}>
                                <img src={Note} alt="locationIcon" /> Add-ons are discounted services that are only available to active monthly subscribers and subject to availability.
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </>

    )
}


export default AddOnItem;

