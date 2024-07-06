import styles from "./styles.module.css";
import { getShopData } from "./_lib/shopDataFetch/getShopData";
import Link from "next/link";
import SessionHandler from "./(categories)/_components/SessionHandler";

export const runtime = "edge";

export default async function HomePage({ searchParams }) {
  // Obtener parámetros de búsqueda del código QR escaneado para obtener la información actual de la tienda
  const { shopRef } = searchParams;

  let shopInfo;
  if ((shopRef?.length > 0 && shopRef !== null) || undefined) {
    // If shopRef exists, assing shopInfo data
    shopInfo = await getShopData(shopRef);
  }

  const { shopName } = shopInfo || "";

  if (shopInfo && shopRef) {
    return (
      <main className={styles.main}>
        <SessionHandler shopRef={shopRef} />
        <h1>Hola,</h1>
        <span>
          Bienvenido a impretion shops {shopName}, vamos a personalizar y a
          darle un toque unico a esas cosas que tanto quieres.
        </span>

        {/*
        <div className={styles.categoryCard}>
          <div className={styles.categoryHead}>
            <h4>Productos para mascotas</h4>
            <img
              src="/icons/presentation-icons/pet.svg"
              className={styles.categoryIcon}
            ></img>
          </div>
          <span className={styles.categoryDescription}>
            Explora una gran variedad de productos personalizables para tus
            mascotas y personalizalos y haz el pidido aqui mismo con unos
            cuantos clicks!.
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.separator}></div>
            <div className={styles.imagesContainer}>
              <img
                className={styles.categoryImageExample}
                src="https://placehold.co/400"
              ></img>
              <img
                className={styles.categoryImageExample}
                src="https://placehold.co/400"
              ></img>
              <img
                className={styles.categoryImageExample}
                src="https://placehold.co/400"
              ></img>
              <img
                className={styles.categoryImageExample}
                src="https://placehold.co/400"
              ></img>
              <img
                className={styles.categoryImageExample}
                src="https://placehold.co/400"
              ></img>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                href={{
                  pathname: "/pets",
                  query: { shopRef },
                }}
                style={{ width: "100%" }}
              >
                <button className={styles.continueBtn}>Continuar</button>
              </Link>
            </div>
          </div>
        </div>
        */}

        <div className={styles.categoryCard}>
          <div className={styles.categoryHead}>
            <h4>Productos para personalizar</h4>
            {/*
            <img
              src="/icons/presentation-icons/home.svg"
              className={styles.categoryIcon}
            ></img>
             */}
          </div>
          <span className={styles.categoryDescription}>
            Multiples productos para que decores tu casa con fotos de familiares
            y diseños unicos, dale a tu hogar ese toque especial que todos
            buscamos!.
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.separator}></div>

            <div className={styles.imagesContainer}>
              <img
                className={styles.categoryImageExample}
                src="/images/examples/normal.webp"
              ></img>
              <img
                className={styles.categoryImageExample}
                src="/images/examples/magic.webp"
              ></img>
              <img
                className={styles.categoryImageExample}
                src="/images/examples/colorid.webp"
              ></img>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                href={{
                  pathname: "/general",
                  query: { shopRef },
                }}
                style={{ width: "100%" }}
              >
                <button className={styles.continueBtn}>Continuar</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "100%" }}
          src="images/pings/not-affiliated-shop-found.png"
        ></img>
      </div>
    );
  }
}
