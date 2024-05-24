import styles from "./styles.module.css";

export default function Loader() {
  return (
    <div className={styles.LoadingioSpinnerRolling}>
      <div className={styles.Ldio}>
        <div></div>
      </div>
    </div>
  );
}
