import { useState } from "react";

import { Minus, Plus } from "assets/images";

import { generateUniqueId } from "utils/generateId";

import styles from "../Learn.module.scss";

interface IProps {
  item: {
    question: string;
    answer: string;
  };
  firstItem?: boolean;
  lastItem?: boolean;
}
const FaqsItem = ({ item, firstItem, lastItem }: IProps) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div
      key={generateUniqueId()}
      tabIndex={0}
      className={`${styles.lC_faqs_item}
      ${isOpened ? styles.lC_faqs_item_opened : ""}
      
      ${firstItem ? styles.lC_faqs_item_first : ""}
      ${lastItem ? styles.lC_faqs_item_last : ""}
      `}
      onClick={() => {
        setIsOpened(!isOpened);
      }}
      onBlur={() => {
        setIsOpened(false);
      }}
    >
      <div
        className={
          !isOpened
            ? `${styles.lC_faqs_item_icon}  ${styles.lC_faqs_item_icon_opened} `
            : styles.lC_faqs_item_icon
        }
      >
        <img src={isOpened ? Minus : Plus} alt={"Minus"} />
      </div>
      <div className={styles.lC_faqs_item_question}>{item.question}</div>
      <div className={styles.lC_faqs_item_answer}>{item.answer}</div>
    </div>
  );
};

export default FaqsItem;
