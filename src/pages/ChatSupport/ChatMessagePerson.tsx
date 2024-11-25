import styles from "./ChatSupport.module.scss";
import type { IMessage } from "./interfaces";

interface IProps {
	message: IMessage;
}

const ChatMessagePerson: React.FC<IProps> = ({ message }) => {
	return (
		<div
			className={styles.supportContainer__content_main_content_chat_userMessage}
			style={message.images?.[0] && { height: "135px" }}
		>
			{" "}
			<div
				className={
					styles.supportContainer__content_main_content_chat_userMessage_message
				}
			>
				<div
					className={
						styles.supportContainer__content_main_content_chat_userMessage_message_text
					}
				>
					{message.message}
				</div>

				{message?.images && message?.images?.length > 0 && (
					<div
						className={
							styles.supportContainer__content_main_content_chat_userMessage_message_images
						}
					>
						{message.images.map((image) => (
							<img
								key={image.url}
								src={image.url}
								alt="ww"
								className={
									styles.supportContainer__content_main_content_chat_userMessage_message_image
								}
							/>
						))}
					</div>
				)}
				<div
					className={
						styles.supportContainer__content_main_content_chat_userMessage_message_data
					}
				>
					{message.time}
				</div>
			</div>
		</div>
	);
};

export default ChatMessagePerson;
