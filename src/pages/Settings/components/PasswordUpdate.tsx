import { Close } from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Sheet } from "react-modal-sheet";

import styles from "../Settings.module.scss";

const PasswordUpdate = () => {
    const [forgotPasswordOpened, setForgotPasswordOpened] = useState(false)
    const width = useWindowWidth();
    return (
        <>
            <div className={styles.settings_title}>Change password</div>
            <div className={styles.settings_subTitle} >Update your information and manage your account.</div>
            <div className={styles.settings_passwordContainer}>
                <div className={styles.settings_passwords}>
                    <div className={styles.settings_inputContainer2}>
                        <div className={styles.settings_text}>Old password</div>
                        <input type="text" placeholder="" />
                    </div>
                    <div className={styles.settings_inputContainer2}>
                        <div className={styles.settings_text} >Password</div>
                        <input type="text" placeholder="Must be 8 characters " />
                    </div>
                </div>

                <div className={styles.settings_passwordContainer_forgot} onClick={() => {
                    setForgotPasswordOpened(true);
                }} >Forgot your current password or having a problem ?</div>
            </div>
            <div className={styles.settings_buttons}>
                <div>
                </div>
                <div className={styles.settings_buttons_container}>
                    <div className={styles.settings_buttons_save} >Save changes</div>
                </div>
            </div>
            {
                forgotPasswordOpened && width > 768 && createPortal(
                    <div className={styles.invite} tabIndex={-1} onClick={() => { setForgotPasswordOpened(false) }}>
                        <div className={styles.invite_wrapper} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.invite_wrapper_header}>Reset your password<div
                                className={styles.invite_closeButton}
                                onClick={() => { setForgotPasswordOpened(false) }}
                            >
                                <img src={Close} alt='' />
                            </div></div>
                            <div className={styles.invite_wrapper_subHeader}>Enter the email address you used to register with. </div>
                            <div className={styles.invite_wrapper_title}>Email </div>
                            <input className={styles.invite_wrapper_input} type='text' />
                            <div className={styles.invite_wrapper_forgot} >Forgot or lose your email address?</div>
                            <div className={styles.invite_wrapper_buttons}>
                                <div className={styles.invite_wrapper_buttons_cancel}>Back to settings</div>
                                <div className={styles.invite_wrapper_buttons_save}>Send instructions</div>
                            </div>

                        </div>
                    </div>,
                    document.body
                )
            }
            {
                forgotPasswordOpened && width < 768 &&
                <Sheet
                    isOpen={forgotPasswordOpened}
                    onClose={() => setForgotPasswordOpened(false)}
                    dragVelocityThreshold={500}
                    detent="full-height"
                    style={{
                        backdropFilter: "blur(3px)",
                        WebkitBackdropFilter: "blur(3px)",
                        background: "#11100E99",
                    }}
                    className={styles.settings_sheetMain}
                >
                    <div
                        className={styles.settings_closeArea}
                        onClick={() => setForgotPasswordOpened(false)}
                    ></div>
                    <Sheet.Container className={`${styles.settings_sheet} `}>
                        <Sheet.Content className={styles.settings_sheetContainer}>
                            <div className={styles.settings_sheetLine}></div>
                            <div className={styles.invite_wrapper_header}>Reset your password</div>
                            <div className={styles.invite_wrapper_subHeader}>Enter the email address you used to register with.</div>
                            <div className={styles.invite_wrapper_title}>Email </div>
                            <input className={styles.invite_wrapper_input} type='text' />
                            <div className={styles.invite_wrapper_forgot}>Forgot or lose your email address?</div>
                            <div className={styles.invite_wrapper_buttons}>
                                <div className={styles.invite_wrapper_buttons_cancel} onClick={() => { setForgotPasswordOpened(false) }} >Back to settings</div>
                                <div className={styles.invite_wrapper_buttons_save} onClick={() => { setForgotPasswordOpened(false) }} >Send instructions</div>

                            </div>

                        </Sheet.Content>
                    </Sheet.Container>
                </Sheet>
            }
        </>
    )
}

export default PasswordUpdate;