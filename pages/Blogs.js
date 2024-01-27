
import styles from "../styles/Blog.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as fs from "fs";
import InfiniteScroll from "react-infinite-scroll-component";
// Step 1:Collect all the files from blogdata directory
// Step 2:Iterate through them and Display them


const Blogs = (props) => {

  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2)
  const fetchMoreData = async () => {
   let d=await fetch(`http://localhost:3000/api/blogs/?count=${count+2}`)
   let data=await d.json()
  setCount(count+2)
    setBlogs(data)
  };

  return (
    <>
      <div className={styles.con}>
        <main className={styles.main}>
          <InfiniteScroll
            dataLength={blogs.length} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={props.allCount !== blogs.length}
            loader={<div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You are out of content</b>
              </p>
            }
            // below props only if you need pull down functionality
          >
            {
        blogs &&  blogs?.map((index) => {
              return (
                <div key={index.slug} className={styles.blogItems}>
                  <Link href={`/blogpost/${index.slug}`}>
                    <h3>{index.title}</h3>
                    <p className={styles.blogItemP}>
                      {index.metadesc.substr(0, 140)}....
                    </p>
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
          </InfiniteScroll>

          <div className={styles.blogCont}>
           
          </div>
        </main>
      </div>
    </>
  );
};

export async function getStaticProps(context) {

  let data = await fs.promises.readdir("blogdata");
  let allCount=data.length
  let myfile;
  let allBlogs = [];

  for (let index = 0; index < 2; index++) {
    const item = data[index];

    myfile = await fs.promises.readFile("blogdata/" + item, "utf-8");

    allBlogs.push(JSON.parse(myfile));
  }
  return {
    props: { allBlogs,allCount },
    revalidate: 60, 
  };
}

export default Blogs;
