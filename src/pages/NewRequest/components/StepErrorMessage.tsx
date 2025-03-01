import styles from "../NewRequest.module.scss";

const StepErrorMessage = () => {

    return <div className={styles.nR_formContainer_error}>
        Please ensure all required fields are filled out before
        submitting the form. Each section must be completed to
        proceed.
    </div>
}


export default StepErrorMessage;