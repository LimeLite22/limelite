import { GapCheck, GapUnCheck, InvisiblePassword, VisiblePassword } from 'assets/images';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './PasswordNew.module.scss';

const PasswordNew = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const handleForgotPasssowrd = () => {
        navigate('/password-reset');
    }
    const handleToggleMe = () => {
        setRememberMe(!rememberMe);
    }
    return (
        <div className={styles.container} >
            <div className={styles.wrapper}>
                <div className={styles.wrapper_header}>Enter your new password</div>
                <div className={styles.wrapper_subHeader}>Your new password must be different to previous password.</div>
                <div className={styles.wrapper_inputContainer}>
                    <div className={styles.wrapper_inputContainer_text} >New password</div>
                    <input className={styles.wrapper_inputContainer_input} type={'text'} />
                </div>
                <div className={styles.wrapper_inputContainer}>
                    <div className={styles.wrapper_inputContainer_text}>Confirm new password</div>
                    <div className={styles.wrapper_inputWrapper}>
                        <input className={styles.wrapper_inputContainer_input} type={!isPasswordVisible ? 'password' : 'text'} />
                    </div>

                </div>
                <div className={styles.wrapper_buttons}>
                    <div className={styles.wrapper_cancel} >Cancel</div>
                    <div className={styles.wrapper_login}>Reset password</div>
                </div>
            </div>
        </div>
    )
}

export default PasswordNew;