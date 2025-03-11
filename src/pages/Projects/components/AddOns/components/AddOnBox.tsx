import { IAddOnsValue } from "interfaces/interfaces";

import styles from "../../../ProjectsPage.module.scss";

interface IProps {
  item: IAddOnsValue
  index: number
}

const AddOnBox = ({ item, index }: IProps) => {
  return (
    <div className={styles.infoContainer_text}><p>{`Add-on ${index + 1}`}</p>
      {item.header}
    </div>
  );
};

export default AddOnBox;
