import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__navigation}>
        <div className={styles.footer__navigation_item}>Terms & Conditions</div>
        <div className={styles.footer__navigation_item}>Privacy Policy</div>
        <div className={styles.footer__navigation_item}>System Status</div>
        <div className={styles.footer__navigation_item}>Product Updates</div>
      </div>
      <div className={styles.footer__copyright}>
        © 2024 LimeLite Videos. All Rights Reserved.
      </div>
    </div>
  );
};
export default Footer;
