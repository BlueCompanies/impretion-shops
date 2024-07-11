"use client";
import styles from "./styles.module.css";
import Link from "next/link";

export default function ContinueButton({ searchParam }) {
  const { shopRef } = searchParam;

  return (
    <Link
      href={{
        pathname: "/general",
        query: { shopRef },
      }}
      style={{ width: "100%" }}
    >
      <button
        className={styles.continueBtn}
        onClick={(e) => e.stopPropagation()}
      >
        Continuar
      </button>
    </Link>
  );
}
