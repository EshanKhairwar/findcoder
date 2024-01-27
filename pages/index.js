import styles from "../app/page.module.css";

import Link from "next/link";
import Navbar from "@/pages/Navbar";
import { useState } from "react";
import * as fs from "fs";
export default function Home(props) {
  const [blogs, setBlogs] = useState(props.allBlogs);
  return (
    <>
      <style jsx>{`
        h2 {
          font-size: 38px;
        }

        h3 {
          font-size: 28px;
        }
      `}</style>
      {/* <Navbar /> */}
      {/* <Dummy/> */}
      <main className={styles.main}>
        <div className={styles.headings}>
          <h1 className={styles.title}>
            <span className={styles.mySpan}>
              <strong>&lt;Hunting Coder/&gt;</strong>
            </span>
          </h1>
          <p className={styles.para}>
            A Blog for hunting coders by finding coders...
          </p>
          <div
            className="imgCont"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <img
              className={styles.myImg}
              src="/HomeCoder.avif"
              width={600}
              height={400}
              alt="Hunting Coder"
            />
          </div>
        </div>

        <div className={styles.con}>
          <h2>Popular Blogs</h2>

          {blogs?.map((index, key) => {
            return (
              <div key={key} className={styles.blogItems}>
                <h3>{index.title}</h3>
                <p className={styles.blogItemP}>
                  {index.metadesc.substr(0, 140)}....
                </p>
                <Link href={`/blogpost/${index.slug}`}>
                  <button
                    style={{
                      margin: "15px",
                      color: "white",
                      background: "black",
                      width: "100px",
                      height: "30px",
                      borderColor: "whitesmoke",
                      borderRadius: "20px",
                    }}
                  >
                    Read More
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let myfile;
  let allBlogs = [];

  for (let index = 0; index < data.length; index++) {
    const item = data[index];

    myfile = await fs.promises.readFile("blogdata/" + item, "utf-8");

    allBlogs.push(JSON.parse(myfile));
  }
  return {
    props: { allBlogs },
  };
}
