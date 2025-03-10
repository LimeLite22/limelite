import { testRequest } from "../../../../redux/requests/consts";
import styles from "../../ProjectsPage.module.scss";
import AddOnBox from "./components/AddOnBox";

const AddOnsSettings = () => {
  const type = testRequest?.projectInfoSettings?.type;

  return (
    <div className={styles.infoContainer}
    >

      <div className={styles.infoContainer_header} >
        Other Add-ons
      </div>
      {
        type !== undefined && type?.addOns.map((item, index) => {
          if (index !== 0 && item.isSelected) return <AddOnBox key={index} item={item} />
        })

      }
    </div>
  );
};

export default AddOnsSettings;
