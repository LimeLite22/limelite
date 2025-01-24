import { GapCheck, GapUnCheck, InvisiblePassword, VisiblePassword } from 'assets/images';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './Login.module.scss';

const Login = () => {
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
                <div className={styles.wrapper_header}>Welcome back</div>
                <div className={styles.wrapper_subHeader}>A LimeLite account is all you need to access your subscription services.</div>
                <div className={styles.wrapper_inputContainer}>
                    <div className={styles.wrapper_inputContainer_text} >Email address </div>
                    <input className={styles.wrapper_inputContainer_input} type={'text'} />
                </div>
                <div className={styles.wrapper_inputContainer}>
                    <div className={styles.wrapper_inputContainer_text}>Password  <span onClick={handleForgotPasssowrd}>Forgot ?</span></div>
                    <div className={styles.wrapper_inputWrapper}>
                        <img className={styles.wrapper_inputImg} src={isPasswordVisible ? VisiblePassword : InvisiblePassword} alt="" onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                        <input className={styles.wrapper_inputContainer_input} type={!isPasswordVisible ? 'password' : 'text'} />
                    </div>

                </div>
                <div className={styles.wrapper_rememberMe} onClick={handleToggleMe}> <img src={rememberMe ? GapCheck : GapUnCheck} alt="" /> Remember me</div>
                <div className={styles.wrapper_buttons}>
                    <div className={styles.wrapper_cancel} >Cancel</div>
                    <div className={styles.wrapper_login}>Log in</div>
                </div>
                <div className={styles.wrapper_text}>New to Limelite? <span>Sign Up</span></div>
            </div>
        </div>
    )
}

export default Login;