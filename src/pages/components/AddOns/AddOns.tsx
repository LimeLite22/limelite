import { testRequest } from "../../../redux/requests/consts";
import styles from "../ProjectOverview.module.scss";
import AddOnBox from "./components/AddOnBox";

const AddOnsSettings = () => {
  const type = testRequest?.projectInfoSettings?.type;
  const addOns = type?.addOns.filter((item, index) => index !== 0 && item.isSelected);

  return (
    <div className={styles.infoContainer}
    >

      <div className={styles.infoContainer_header} >
        Other Add-ons
      </div>
      {
        addOns.map((item, index) => {
          return <AddOnBox key={index} item={item} index={index} />
        })

      }
    </div>
  );
};

export default AddOnsSettings;
