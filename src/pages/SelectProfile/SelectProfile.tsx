import { useNavigate } from "react-router";

import Header from "components/Header/Header";

import {
  AddIcon,
  EditIcon,
  User1Foto,
  User2Foto,
  User3Foto,
  User4Foto,
} from "assets/images";

import styles from "./SelectProfile.module.scss";
import { Link } from "react-router-dom";

const SelectProfile = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.selectProfileСontainer}>
      <Header />
      <div className={styles.selectProfileСontainer__content}>
        <div className={styles.selectProfileСontainer__content_editButton}>
          <img src={EditIcon} alt={"EditIcon"} />
          Edit
        </div>
        <div className={styles.selectProfileСontainer__content_image}></div>
        <div className={styles.selectProfileСontainer__content_text}>
          Lorem Ispum Dollar is a Dummy Text That is Used in place of a text
          that is used in place of a text Lorem Ispum Dollar
        </div>
        <div className={styles.selectProfileСontainer__content_accountsList}>
          <div
            className={styles.selectProfileСontainer__content_accountsList_item}
            onClick={() => navigate("/welcome")}
          >
            <img
              className={
                styles.selectProfileСontainer__content_accountsList_item_foto
              }
              src={User1Foto}
              alt={"Account"}
            />
            Kawish
          </div>
          <div
            className={styles.selectProfileСontainer__content_accountsList_item}
          >
            <img
              className={
                styles.selectProfileСontainer__content_accountsList_item_foto
              }
              src={User2Foto}
              alt={"Account"}
              onClick={() => navigate("/welcome")}
            />
            Jainy
          </div>
          <div
            className={styles.selectProfileСontainer__content_accountsList_item}
          >
            <img
              className={
                styles.selectProfileСontainer__content_accountsList_item_foto
              }
              src={User3Foto}
              onClick={() => navigate("/welcome")}
              alt={"Account"}
            />
            Mr.LAVA
          </div>
          <div
            className={styles.selectProfileСontainer__content_accountsList_item}
          >
            <img
              className={
                styles.selectProfileСontainer__content_accountsList_item_foto
              }
              src={User4Foto}
              onClick={() => navigate("/welcome")}
              alt={"Account"}
            />
            Shabnam L.
          </div>
        </div>
        <Link to={'/profile-create'} className={styles.selectProfileСontainer__content_addIcon}>
          <img
            className={styles.selectProfileСontainer__content_addIcon_img}
            src={AddIcon}
            alt={"AddIcon"}
          />
          Add New
        </Link>
      </div>
    </div>
  );
};

export default SelectProfile;
