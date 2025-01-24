import {
  Arrow2,
  AttachFileIcon,
  SendGreenIcon,
  SendIcon,
  SettingsDots,
  SupportCloseIcon,
  VoiceMessageIcon,
} from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { generateUniqueId } from "utils/generateId";

import ChatMessagePerson from "./ChatMessagePerson";
import ChatMessageSupport from "./ChatMessageSupport";
import styles from "./ChatSupport.module.scss";
import type { IMessage } from "./interfaces";

const ChatSupport = (): JSX.Element => {
  const [message, setMessage] = useState<IMessage>({
    message: "",
    person: true,
    id: generateUniqueId(),
    images: [],
    time: "",
  });
  const [height, setHeight] = useState(0);
  const [messageList, setMessageList] = useState<IMessage[]>([
    {
      id: generateUniqueId(),
      message: `Hi there! Thank you for reaching out to Limelite support. How
      can I assist you today?`,
      time: "10:00",
      person: false,
    },
    {
      id: generateUniqueId(),
      message:
        "Hi, I'm having trouble downloading a video from my project. Can you help me with that?",
      time: "10:04",
      person: true,
    },
  ]);
  const inputRef = useRef(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const width = useWindowWidth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file) {
        setMessage({
          ...message,
          images: [
            ...(message.images ?? []),
            {
              id: generateUniqueId(),
              file,
              url: URL.createObjectURL(file),
            },
          ],
        });
      }
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSendMessage = (): void => {
    if (message.message.trim() !== "") {
      setMessageList([
        ...messageList,
        {
          ...message,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        },
      ]);
      setMessage({
        message: "",
        person: true,
        id: generateUniqueId(),
        images: [],
        time: "",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const updateHeight = () => {
    const element = document.getElementById("supportContainer");
    if (element) {
      if (width < 768) {
        setHeight(element.offsetHeight - 80);
      } else {
        setHeight(element.offsetHeight - 140);
      }
    }
  };
  const handleImageClick = (item: { id: string; url: string }) => {
    message.images &&
      setMessage({
        ...message,
        images: message.images.filter(
          (_) => _.id !== item.id,
        ),
      });
  }

  useEffect(() => {
    updateHeight();

    const handleResize = () => {
      updateHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (messageListRef.current) {
      setTimeout(() => {
        messageListRef.current!.scrollTop =
          messageListRef.current!.scrollHeight;
      }, 0);
    }
  }, [messageList]);
  return (
    <>
      <div className={styles.supportContainer}>
        <div className={styles.supportContainer__content_main_header}>
          <div className={styles.supportContainer__content_main_header_text}>
            Chat with Support
          </div>
          <div className={styles.supportContainer__content_main_header_subText}>
            <div
              className={
                styles.supportContainer__content_main_header_subText_dot
              }
            ></div>{" "}
            Choose preferred method <img src={Arrow2} alt={"Arrow"} />{" "}
            <span>Chat with LimeLite</span>
          </div>
          <div className={styles.supportContainer__content_main_header_mobText}>
            <Link to="/support">
              <div
                className={
                  styles.supportContainer__content_main_header_mobText_button
                }
              >
                <img src={Arrow2} alt={"CloseIcon"} />
              </div>
            </Link>
            <div>Chat Support</div>
            <div
              className={
                styles.supportContainer__content_main_header_mobText_settings
              }
            >
              <img src={SettingsDots} alt={"SettingsDots"} />
            </div>
          </div>
        </div>
        <div
          className={styles.supportContainer__content_main_content}
          id="supportContainer"
        >
          <div
            className={`${styles.supportContainer__content_main_content_chat} ${message.images && message.images?.length > 0
              ? styles.supportContainer__content_main_content_chat_padding
              : ""
              }`}
            ref={messageListRef}
            style={{
              height: `${height}px`,
              maxHeight: `${height}px`,
              paddingBottom:
                message.images && message.images?.length > 0 ? "140px" : "0",
            }}
          >
            {messageList.map((item) => {
              if (item.person) {
                return <ChatMessagePerson key={item.message} message={item} />;
              } else {
                return <ChatMessageSupport key={item.message} message={item} />;
              }
            })}
          </div>

          {message.images && message.images.length > 0 && (
            <div
              className={styles.supportContainer__content_main_content_images}
            >
              {message.images.map((item, index) => (
                <div
                  className={
                    styles.supportContainer__content_main_content_images_imageContainer
                  }
                >
                  <div
                    className={
                      styles.supportContainer__content_main_content_images_imageContainer_close
                    }
                    onClick={() => {
                      handleImageClick(item);
                    }}
                  >
                    <div
                      className={
                        styles.supportContainer__content_main_content_images_imageContainer_close_icon
                      }
                    >
                      <img src={SupportCloseIcon} alt={"CloseIcon"} />
                    </div>
                  </div>
                  <img
                    className={
                      styles.supportContainer__content_main_content_images_image
                    }
                    src={item.url}
                    alt="Preview"
                  />
                </div>
              ))}
            </div>
          )}

          <div
            className={
              styles.supportContainer__content_main_content_messageInputContainer
            }
          >
            <div>
              <img
                src={AttachFileIcon}
                alt="AttachFileIcon"
                onClick={handleIconClick}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
            <input
              type="text"
              value={message.message}
              onChange={(e) =>
                setMessage({
                  ...message,
                  message: e.target?.value,
                })
              }
              onKeyDown={handleKeyDown}
              ref={inputRef}
              className={
                styles.supportContainer__content_main_content_messageInput
              }
              placeholder={"Type here your message..."}
            />
            <div
              className={
                styles.supportContainer__content_main_content_messageInputContainer_buttons
              }
            >
              <img src={VoiceMessageIcon} alt={"VoiceMessageIcon"} />
              <div
                className={
                  styles.supportContainer__content_main_content_messageInputContainer_buttons_divider
                }
              ></div>
              <div
                className={
                  styles.supportContainer__content_main_content_messageInputContainer_buttons_send
                }
                onClick={() => {
                  setMessageList([
                    ...messageList,
                    {
                      ...message,
                      time: new Date().toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }),
                    },
                  ]);
                  setMessage({
                    message: "",
                    person: true,
                    id: generateUniqueId(),
                    images: [],
                    time: new Date().toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }),
                  });
                }}
              >
                {" "}
                {message.message.length === 0 ? (
                  <img src={SendIcon} alt={"SendIcon"} />
                ) : (
                  <img src={SendGreenIcon} alt={"SendGreenIcon"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatSupport;
