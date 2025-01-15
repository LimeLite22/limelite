import { DeleteRed, NoUser, Remove2, } from "assets/images";
import { useEffect, useRef, useState } from "react";
import styles from "./Settings.module.scss";
import { FileDrop } from "react-file-drop";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount, updateAccount } from "../../redux/account/account";

const Settings = () => {
    const account = useSelector(selectAccount);
    const [currentValues, setCurrentValues] = useState<{
        name: string,
        lastName: string,
        email: string,
        phone: string,
        jobTitle: string
        password: string
        shirtSize: 'S' | 'M' | 'L' | 'XL',
        foto: string | File

    }
    >({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        jobTitle: '',
        password: '',
        shirtSize: 'M',
        foto: NoUser
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];

        if (uploadedFile) {
            setCurrentValues({ ...currentValues, foto: uploadedFile });
        }
    };
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(updateAccount(currentValues))
    }
    useEffect(() => {
        setCurrentValues(account)
    }, [account])
    return (
        <div className={styles.settings} >
            <div className={styles.settings_header}>Setting </div>
            <div className={styles.settings_navigation}>
                <div className={`${styles.settings_navigation_item} ${styles.settings_navigation_selected}`}>Profile edit</div>
                <div className={styles.settings_navigation_item}>Permissons</div>
                <div className={styles.settings_navigation_item}>Password</div>
            </div>
            <div className={styles.settings_title}>Personal info</div>
            <div className={styles.settings_subTitle}>Update your information and manage your account.</div>
            <div className={styles.settings_container}>
                <div className={styles.settings_container_column} >
                    <div className={styles.settings_container_section}>
                        <div className={styles.settings_container_img}>
                            <div className={styles.settings_container_img_remove} onClick={() => {
                                setCurrentValues({ ...currentValues, foto: NoUser })
                            }}>
                                <img src={Remove2} alt="remove" />
                            </div>
                            <img src={typeof currentValues.foto === 'string' ? currentValues.foto : URL.createObjectURL(currentValues.foto)} alt="avatar" />
                        </div>

                        <div className={styles.settings_text}>Your photo</div>
                        <div className={styles.settings_subText}>This will be displayed  o your profile.</div>
                    </div>

                    <div className={styles.settings_inputContainer}>
                        <div className={styles.settings_text}> First Name *</div>
                        <input type="text" value={currentValues.name} onChange={(e) => {
                            setCurrentValues({ ...currentValues, name: e.target.value })
                        }} placeholder="First Name" />
                    </div>
                    <div className={styles.settings_inputContainer}>
                        <div className={styles.settings_text}> Job Title *</div>
                        <input type="text" value={currentValues.jobTitle} placeholder="First Name" />
                    </div>
                    <div className={styles.settings_inputContainer}>
                        <div className={styles.settings_text}>  Mobile *</div>
                        <input value={currentValues.phone} type="text" placeholder="First Name" />
                    </div>
                </div>
                <div className={styles.settings_container_column} >
                    <div className={styles.settings_container_section}>
                        <FileDrop
                            className={`${styles.settings_drop}`}
                            onDrop={(files, event) => {
                                if (files && files[0]) {
                                    setCurrentValues({ ...currentValues, foto: files[0] });
                                }
                            }}
                        >
                            <div className={styles.settings_drop_text}>
                                Drag & Drop or <span onClick={handleDivClick}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                    Choose file </span>to upload
                            </div>
                            <div className={styles.settings_drop_text3} >PNG or JPG (max. 400x400px) </div>
                        </FileDrop>
                    </div>
                    <div className={styles.settings_inputContainer}>
                        <div className={styles.settings_text}> Last Name *</div>
                        <input value={currentValues.lastName} type="text" placeholder="First Name" />
                    </div>
                    <div className={styles.settings_inputContainer}>
                        <div className={styles.settings_text}> Email *</div>
                        <input value={currentValues.email} type="text" placeholder="First Name" />
                    </div>
                    <div className={styles.settings_inputContainer}>
                        <div className={styles.settings_text}>  T-Shirt Size*</div>
                        <div className={styles.settings_sizes}>
                            <div className={styles.settings_size} onClick={() => setCurrentValues({ ...currentValues, shirtSize: 'S' })} style={{ border: currentValues.shirtSize === 'S' ? '1px solid var(--green-dark2)' : '' }}>S</div>
                            <div className={styles.settings_size} onClick={() => setCurrentValues({ ...currentValues, shirtSize: 'M' })} style={{ border: currentValues.shirtSize === 'M' ? '1px solid var(--green-dark2)' : '' }}>M</div>
                            <div className={styles.settings_size} onClick={() => setCurrentValues({ ...currentValues, shirtSize: 'L' })} style={{ border: currentValues.shirtSize === 'L' ? '1px solid var(--green-dark2)' : '' }}>L</div>
                            <div className={styles.settings_size} onClick={() => setCurrentValues({ ...currentValues, shirtSize: 'XL' })} style={{ border: currentValues.shirtSize === 'XL' ? '1px solid var(--green-dark2)' : '' }}>XL</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.settings_title}>Change password</div>
            <div className={styles.settings_passwordContainer}>
                <div className={styles.settings_inputContainer2}>
                    <div className={styles.settings_text}>Old password</div>
                    <input type="text" placeholder="" />
                </div>
                <div className={styles.settings_inputContainer2}>
                    <div className={styles.settings_text} >Password</div>
                    <input type="text" placeholder="Must be 8 characters " />
                </div>
            </div>
            <div className={styles.settings_text} >Consent to Receive Text Updates </div>
            <div className={styles.settings_text2}>By checking this box, you agree to receive text messages
                from LimeLite Videos with information about your projects and plan.
                Message and data rates may apply. You can opt out at any time
            </div>
            <div className={styles.settings_text} >The Terms and Conditions of LimeLite </div>
            <div className={styles.settings_text2}>By proceeding, you agree to our Terms and Conditions. Click the link to review the full details.</div>
            <div className={styles.settings_buttons}>
                <div className={styles.settings_buttons_delete}>
                    <img src={DeleteRed} alt="delete" />   Delete account
                </div>
                <div className={styles.settings_buttons_container}>
                    <div className={styles.settings_buttons_cancel}>Cancel</div>
                    <div className={styles.settings_buttons_save} onClick={handleSubmit}>Save changes</div>
                </div>
            </div>

        </div>
    );
};

export default Settings;