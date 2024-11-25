import styles from "../Welcome.module.scss";
import CreditUsageItem from "./CreditUsageItem";

const CreditUsage = () => {
	return (
		<div className={styles.welcomeContainer__content_main_creditUsage}>
			<div className={styles.welcomeContainer__content_main_creditUsage_text}>
				Credit Usage
			</div>
			<div
				className={styles.welcomeContainer__content_main_creditUsage_cardsList}
			>
				<CreditUsageItem
					header={"Credits Remaining"}
					text={"In Plan"}
					number={20}
				/>
				<CreditUsageItem
					header={"Credits Pending"}
					text={"This Month"}
					number={2}
				/>
				<CreditUsageItem
					header={"Credits Used"}
					text={"This Month"}
					number={2}
				/>
			</div>
		</div>
	);
};
export default CreditUsage;
