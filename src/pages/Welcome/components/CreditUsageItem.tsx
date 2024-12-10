import {
	InfoIcon,
	QuestionIcon,
} from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";

import styles from "../Welcome.module.scss";

type IProps = {
	header: string;
	text: string;
	number: number;
};

const CreditUsageItem = ({ header, text, number }: IProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const width = useWindowWidth();
	const rightNumber = width < 768 ? header === "Credits Pending" ? '-90px' : header === "Credits Used" ? '-10px' : '' : '';
	return (
		<div
			className={
				styles.welcomeContainer__content_main_creditUsage_cardsList_card
			}
		>
			<div
				className={
					styles.welcomeContainer__content_main_creditUsage_cardsList_card_header
				}
			>
				{header}
			</div>
			<div
				className={
					styles.welcomeContainer__content_main_creditUsage_cardsList_card_text
				}
				onClick={() => setIsOpen(!isOpen)}
			>
				{text}
				<div
					className={
						styles.welcomeContainer__content_main_creditUsage_cardsList_card_text_iconContainer
					}
					tabIndex={0}
					onBlur={() => setIsOpen(false)}
				>
					<img
					
						src={QuestionIcon}
						alt={"QuestionIconDarkGray"}
					/>
					{isOpen && (
						<div
							className={
								styles.welcomeContainer__content_main_creditUsage_cardsList_card_text_iconContainer_hoverText
							}
							style={{ right: rightNumber }}
						>
							<div
								className={
									styles.welcomeContainer__content_main_creditUsage_cardsList_card_text_iconContainer_hoverText_header
								}
							>
								<img src={InfoIcon} alt={"InfoIcon"} /> Viverra non fermentum
							</div>
							<p
								className={
									styles.welcomeContainer__content_main_creditUsage_cardsList_card_text_iconContainer_hoverText_title
								}
							>
								Non ut cras augue vel lectus arcu id felis. Scelerisque
								phasellus tristique lobortis varius massa ullamcorper. Netus
								nisl sapien adipiscing sit tellus. Suscipit vel bibendum.
							</p>
						</div>
					)}
				</div>
			</div>
			<div
				className={
					styles.welcomeContainer__content_main_creditUsage_cardsList_card_number
				}
			>
				{number}
			</div>
		</div>
	);
};

export default CreditUsageItem;
