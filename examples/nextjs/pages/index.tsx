import Head from "next/head";
import { Image } from "@unpic/react/next";
import styles from "@/styles/Home.module.css";
import bunny from "./bunny.jpg";


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image
          src="https://images.unsplash.com/photo-1617718295766-0f839c2853e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTczfHxyYWluZm9yZXN0JTIwYmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60"
          layout="fullWidth"
          alt=""
          priority
          height={400}
          background="auto"
        />
        <Image
          src="https://cdn.shopify.com/static/sample-images/garnished.jpeg"
          layout="constrained"
          width={800}
          height={600}
          alt="Shopify"
        />
        <Image
          src={bunny}
          width={400}
          height={300}
          layout="fixed"
          alt="Bunny.net"
        />
      </main>
    </>
  );
}
