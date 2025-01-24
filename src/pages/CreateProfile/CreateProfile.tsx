import { AddAccount, GapCheck, GapUnCheck, InvisiblePassword, VisiblePassword } from "assets/images";
import { useEffect, useRef, useState } from "react";

import styles from "./CreateProfile.module.scss";

const CreateProfile = () => {

    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        foto: null,
        phoneNumber: "",
        jobTitle: "",
        tShortSize: "",
        password: "",
        confirmPassword: "",
        receiveMessages: false,
        acceptTerms: false
    })
    const [profileError, setProfileError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        jobTitle: false,
        tShortSize: false,
        password: false,
        confirmPassword: false,
        validPasswords: false,
        receiveMessages: false,
        acceptTerms: false
    })

    const handleError = () => {
        setProfileError({
            firstName: profile.firstName?.length === 0,
            lastName: profile.lastName?.length === 0,
            email: profile.email?.length === 0,
            phoneNumber: profile.phoneNumber?.length === 0,
            jobTitle: profile.jobTitle?.length === 0,
            tShortSize: profile.tShortSize?.length === 0,
            password: profile.password?.length < 8,
            confirmPassword: profile.confirmPassword?.length < 8,
            validPasswords: profile.password !== profile.confirmPassword,
            receiveMessages: !profile.receiveMessages,
            acceptTerms: !profile.acceptTerms
        })
    }

    useEffect(() => {
        setProfileError({
            firstName: false,
            lastName: false,
            email: false,
            phoneNumber: false,
            jobTitle: false,
            tShortSize: false,
            password: false,
            confirmPassword: false,
            receiveMessages: false,
            validPasswords: false,
            acceptTerms: false
        })
    }, [profile])

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const isDisabled = profile.firstName?.length === 0
        || profile.lastName?.length === 0 || profile.email?.length === 0
        || profile.password?.length < 8 || profile.confirmPassword?.length < 8
        || profile.password !== profile.confirmPassword
        || profile.phoneNumber?.length === 0 || profile.jobTitle?.length === 0
        || profile.tShortSize?.length === 0
        || !profile.acceptTerms || !profile.receiveMessages

        ;
    const [userImage, setUserImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUserImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Імітація кліку на інпут
        }
    };

    console.log(profile, "profile")
    useEffect(() => {
        console.log(profile, "profile")
    }
        , [profile])


    return <div className={styles.createProfile}>
        <div className={styles.createProfile_header}>Create your account</div>
        <div className={styles.createProfile_subHeader}>A LimeLite account is all you need to access your subscription services.</div>
        <div className={styles.createProfile_content}>
            <div className={styles.createProfile_content_imageContainer}>
                <img src={userImage || AddAccount} onClick={handleImageClick} className={styles.createProfile_content_image} alt='' />
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }} // Приховуємо інпут
            />
            <div className={styles.createProfile_content_info}>
                <div className={styles.createProfile_text}>Profile Photo </div>
                <div className={styles.createProfile_text2}>Please provide a profile photo to help our video creators connect with you at shoots. </div>
            </div>
        </div>
        <div className={styles.createProfile_row}>
            <div className={styles.createProfile_inputContainer} >
                <div className={styles.createProfile_text}>First Name *</div>
                <input className={styles.createProfile_input} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} type="text" placeholder="Provide your first name..." />
            </div>
            <div className={styles.createProfile_inputContainer} >
                <div className={styles.createProfile_text}>Last Name *</div>
                <input className={styles.createProfile_input} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} type="text" placeholder="Provide your last name..." />
            </div>
            {(profileError.firstName || profileError.lastName) && <div className={styles.createProfile_error}>Complete the fields to proceed.</div>}
        </div>
        <div className={`${styles.createProfile_row} ${styles.hideForDesktop} `}> 
            <div className={styles.createProfile_inputContainer}  >
                <div className={styles.createProfile_text}>Job Title *</div>
                <input className={styles.createProfile_input} onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })} type="text" placeholder="Provide your job title..." />
            </div>
            {(profileError.jobTitle) && <div className={styles.createProfile_error}>Complete the fields to proceed.</div>}
        </div>
        <div className={styles.createProfile_row}>
            <div className={styles.createProfile_inputContainer} >
                <div className={styles.createProfile_text}>Email *</div>
                <input className={styles.createProfile_input} onChange={(e) => setProfile({ ...profile, email: e.target.value })} type="text" placeholder="text@domain.com" />
            </div>
            <div className={styles.createProfile_inputContainer} >
                <div className={styles.createProfile_text}>Mobile *</div>
                <input className={styles.createProfile_input} onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })} type="text" placeholder="(###) ###-####" />
            </div>
            {(profileError.email || profileError.phoneNumber) && <div className={styles.createProfile_error}>Complete the fields to proceed.</div>}
        </div>
        <div className={styles.createProfile_row}> 
            <div className={`${styles.createProfile_inputContainer} ${styles.hideForMob}`}  >
                <div className={styles.createProfile_text}>Job Title *</div>
                <input className={styles.createProfile_input} onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })} type="text" placeholder="Provide your job title..." />
            </div>
            <div className={styles.createProfile_inputContainer} >
                <div className={styles.createProfile_text}>T-Shirt Size*</div>
                <div className={styles.createProfile_sizes} >
                    <div className={styles.createProfile_size} style={{ border: profile.tShortSize === 'S' ? '1px solid var(--green-dark2)' : '' }} onClick={() => setProfile({ ...profile, tShortSize: 'S' })}>S</div>
                    <div className={styles.createProfile_size} style={{ border: profile.tShortSize === 'M' ? '1px solid var(--green-dark2)' : '' }} onClick={() => setProfile({ ...profile, tShortSize: 'M' })}>M</div>
                    <div className={styles.createProfile_size} style={{ border: profile.tShortSize === 'L' ? '1px solid var(--green-dark2)' : '' }} onClick={() => setProfile({ ...profile, tShortSize: 'L' })}>L</div>
                    <div className={styles.createProfile_size} style={{ border: profile.tShortSize === 'XL' ? '1px solid var(--green-dark2)' : '' }} onClick={() => setProfile({ ...profile, tShortSize: 'XL' })}>XL</div>
                </div>
            </div>
            {(profileError.jobTitle || profileError.tShortSize) && <div className={styles.createProfile_error}>Complete the fields to proceed.</div>}
        </div>
        <div className={styles.createProfile_row}>
            <div className={styles.createProfile_inputContainer} >
                <div className={styles.createProfile_text}>Password *</div>
                <div className={styles.createProfile_inputWrapper} >
                    <input className={styles.createProfile_input}
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                        type={isPasswordVisible ? "text" : "password"} placeholder="Must be minimum 8 characters ">
                    </input>
                    <img className={styles.createProfile_inputImg} src={isPasswordVisible ? VisiblePassword : InvisiblePassword} alt="" onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                </div>
            </div>
            <div className={styles.createProfile_inputContainer} >
                <div className={styles.createProfile_text}>Confirm Password *</div>
                <div className={styles.createProfile_inputWrapper}>
                    <input className={styles.createProfile_input}
                        onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                        type={isConfirmPasswordVisible ? "text" : "password"} placeholder="Please confirm password" >
                    </input>
                    <img className={styles.createProfile_inputImg} src={isConfirmPasswordVisible ? VisiblePassword : InvisiblePassword} alt="" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} />
                </div>

            </div>
            {(profileError.password || profileError.confirmPassword || profileError.validPasswords) && <div className={styles.createProfile_error}>{profileError.validPasswords ? 'Passwords do not match' : 'Complete the fields to proceed.'} </div>}
        </div>
        <div className={styles.createProfile_checkContainer}>
            <img src={profile.receiveMessages ? GapCheck : GapUnCheck} alt='' onClick={() => setProfile({ ...profile, receiveMessages: !profile.receiveMessages })} />
            By checking this box, you agree to receive text messages from LimeLite Videos with information about your projects and plan. Message and data rates may apply. You can opt out at any time *
        </div>
        <div className={styles.createProfile_checkContainer}>
            <img src={profile.acceptTerms ? GapCheck : GapUnCheck} alt='' onClick={() => setProfile({ ...profile, acceptTerms: !profile.acceptTerms })} />
            I accept the Terms and Conditions of LimeLite *
        </div>
        <div className={styles.createProfile_buttons}>
            <button className={styles.createProfile_cancel}>Cancel</button>
            <button className={`${styles.createProfile_create} ${isDisabled ? styles.createProfile_disabled : ''} `} onClick={handleError}>Create account</button>
        </div>
        {(profileError.jobTitle || profileError.tShortSize 
            || profileError.password || profileError.confirmPassword 
            || profileError.validPasswords || profileError.receiveMessages 
            || profileError.acceptTerms) && <div className={styles.createProfile_errorMessage}
            >Please ensure all required fields are filled out before submitting the form</div>}
    </div>
};

export default CreateProfile;