import { useEffect, useState } from "react";
import styles from "../../styles/BlogPost.module.css";
import { useRouter } from "next/router";
// Step1:Find the file corresponding to the slug
// Step2:Populate them inside the page
import * as fs from "fs";
const Slug = (props) => {

  const [blog, setBlog] = useState(props.myBlog);
  function createMarkup(c) {
    return {__html: c};
  }
  return (
    <div className={styles.con}>
      <main className={styles.main}>
        <h1>Title of the page {blog && blog.title}</h1>
        <hr />
        <div>
          {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div> }
        </div>

        <address>{blog && blog.author}</address>
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: [
      { params: { slug: "how-to-learn-react" } },
      { params: { slug: "how-to-learn-javascript" } },
      { params: { slug: "how-to-be-coder" } },
      { params: { slug: "how-to-learn-next" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  
  const { slug } = context.params;

  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");

  return {
    props: { myBlog: JSON.parse(myBlog) },
  };
}

export default Slug;
