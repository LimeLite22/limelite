import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './PasswordReset.module.scss';

const PasswordReset = () => {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const handleToggleMe = () => {
        setRememberMe(!rememberMe);
    }
    const handleSendInstructions = () => {
        navigate('/password-new');
    }
    return (
        <div className={styles.container} >
            <div className={styles.wrapper}>
                <div className={styles.wrapper_header}>Reset your password</div>
                <div className={styles.wrapper_subHeader}>Enter the email address you used to register with. </div>
                <div className={styles.wrapper_inputContainer}>
                    <div className={styles.wrapper_inputContainer_text} >Email address </div>
                    <input className={styles.wrapper_inputContainer_input} type={'text'} />
                </div>
                <div className={styles.wrapper_forgot}>Forgot or lose your email address?</div>
                <div className={styles.wrapper_buttons}>
                    <div className={styles.wrapper_cancel} >Back to sign in</div>
                    <div className={styles.wrapper_login} onClick={handleSendInstructions}>Send instructions</div>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset;