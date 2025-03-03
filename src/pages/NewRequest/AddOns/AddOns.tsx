import {
  ArrowBlue3,
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCustomPadding } from "utils/customPadding";

import { selectRequestInfo, updateAddOnSelectionStatus } from "../../../redux/requests/reducer";
import BackButton from "../components/BackButton";
import FormFooter from "../components/FormFooter";
import NextButton from "../components/NextButton";
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";
import { ProjectType } from "../ProjectInfo/components";
import AddOnBox from "./components/AddOnBox";

const AddOns = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const type = selectedRequest?.projectInfoSettings?.type;
  const customPadding = useCustomPadding();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelect = () => {
    type?.addOns[0]?.id && dispatch(updateAddOnSelectionStatus({ id: type?.addOns[0].id }))
    navigate("/new-request/submit");
  };

  return (
    <div
      className={styles.nR_container}
      style={{
        paddingBottom: customPadding,
      }}
    >
      <Link to="/new-request/start">
        <div className={styles.nR_backButton}>
          <img src={ArrowGray3} alt="" /> Back to New Request{" "}
        </div>
      </Link>
      <div className={styles.nR_subContainer}>
        <StepsNavigation />
        <ProjectType />
        <div className={styles.nR_header}>

          <div className={styles.nR_header_text + " " + styles.nR_header_text_mobPadding} >
            <Link to="/new-request/start">
              <div className={styles.nR_header_text_button}>
                <img src={ArrowGray4} alt="" />
              </div>
            </Link>
            About Your Video Edit
          </div>
          <div className={styles.nR_header_text2}>Based on your project type, you may want to consider the following add-ons.</div>
          <div className={styles.nR_header_text3} onClick={handleSelect}>
            No thanks,<br></br> we do not need any additional add-ons <img src={ArrowBlue3} alt="" /></div>
        </div>

        <div className={styles.nR_formContainer}>
          <div >
            {
              type !== undefined && type?.addOns.map((item, index) => {
                if (index !== 0) return <AddOnBox key={index} item={item} />
              })

            }
          </div>
          <div className={styles.nR_formContainer_buttons}>
            <BackButton />
            <div className={styles.nR_buttons_container}>
              <button className={styles.nR_buttons_save}>
                <img src={DetailsGreen} alt="" />
              </button>
              <NextButton isDisabled={false} onClick={() => { }} />
            </div>
          </div>
        </div>
      </div>
      <FormFooter />
    </div>
  );
};

export default AddOns;
