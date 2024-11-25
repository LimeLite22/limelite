import "swiper/css";
import "swiper/css/pagination";

import styles from "../../Welcome.module.scss";
import { data } from "./data";
import InspirationItemMobile from "./InspirationItemMobile";

const InspirationMobile = (): JSX.Element => {
  return (
    <div className={styles.welcomeContainer__content_main_inspirationMobile}>
      <div
        className={styles.welcomeContainer__content_main_inspirationMobile_text}
      >
        Inspiration
      </div>
      <div
        className={
          styles.welcomeContainer__content_main_inspirationMobile_cardsList
        }
      >
        <InspirationItemMobile />
        {data.map((item) => (
          <div
            key={item.header}
            className={
              styles.welcomeContainer__content_main_inspirationMobile_cardItem
            }
          >
            <img src={item.img} alt={"CompanyOverviewIcon"} />

            <div
              className={
                styles.welcomeContainer__content_main_inspirationMobile_cardItem_header
              }
            >
              {item.header}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationMobile;
