import { Route, Routes, useLocation } from "react-router";
import { Link } from "react-router-dom";

import FaqsItem from "./components/FaqsItem";
import { data } from "./data";
import styles from "./Learn.module.scss";

// lC = Learn Container
const Learn = () => {
  const location = useLocation();
  return (
    <>
      <div className={styles.lC}>
        <div className={styles.lC_header}> Learn</div>
        <div className={styles.lC_switcher}>
          <Link
            to="/learn/videos"
            className={styles.lC_switcher_item}
            style={{
              background: location.pathname.includes("videos") ? "white" : "",
            }}
          >
            Videos
          </Link>
          <div
            className={styles.lC_switcher_divider}
            style={{
              background: location.pathname.includes("faqs")
                ? ""
                : "transparent",
            }}
          ></div>
          <Link
            to="/learn/articles"
            className={styles.lC_switcher_item}
            style={{
              background: location.pathname.includes("articles") ? "white" : "",
            }}
          >
            Articles
          </Link>
          <div
            className={styles.lC_switcher_divider}
            style={{
              background: location.pathname.includes("videos")
                ? ""
                : "transparent",
            }}
          ></div>
          <Link
            to="/learn/faqs"
            className={styles.lC_switcher_item}
            style={{
              background: location.pathname.includes("faqs") ? "white" : "",
            }}
          >
            FAQS
          </Link>
        </div>
        <Routes>
          <Route path="/videos" element={<div>videos</div>} />
          <Route path="/articles" element={<div>articles</div>} />
          <Route
            path="/faqs"
            element={
              <>
                {data.map((item, index) => (
                  <FaqsItem
                    firstItem={index === 0}
                    lastItem={index === data.length - 1}
                    item={item}
                  />
                ))}
                <div className={styles.lC_faqs_buttonsContainer}>
                  <div className={styles.lC_faqs_buttonsContainer_moreHelp}>
                    Need more Help ?
                  </div>
                  <div
                    className={styles.lC_faqs_buttonsContainer_contactSupport}
                  >
                    Contact Support
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default Learn;
