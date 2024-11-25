import SupportManIcon from "assets/images/Support/SupportManIcon.svg";
import styles from "./ChatSupport.module.scss";
import type { IMessage } from "./interfaces";

interface IProps {
	message: IMessage;
}

const ChatMessageSupport: React.FC<IProps> = ({ message }) => {
	return (
		<div
			className={
				styles.supportContainer__content_main_content_chat_supportMessage
			}
		>
			<img src={SupportManIcon} alt={"SupportManIcon"} />
			<div
				className={
					styles.supportContainer__content_main_content_chat_supportMessage_message
				}
			>
				<div
					className={
						styles.supportContainer__content_main_content_chat_supportMessage_message_text
					}
				>
					{message.message}
				</div>
				<div
					className={
						styles.supportContainer__content_main_content_chat_supportMessage_message_data
					}
				>
					{message.time}
				</div>
			</div>
		</div>
	);
};

export default ChatMessageSupport;
