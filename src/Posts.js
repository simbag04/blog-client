import { useEffect, useState } from "react";
import { SinglePost } from "./SinglePost";

export function Posts ({user, setUser}) {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(null);
  const clickHandler = (e) => {
    setId(e.target.id);
  }

  const allClickHandler = () => {
    setId(null);
  }
  useEffect(() => {
    const getPosts = async () => {
      let currPosts = null;
      if (id === null) {
        currPosts = await fetch("http://localhost:5000/posts");
        const json = await currPosts.json();
        setPosts(JSON.parse(json));
      } else {
        currPosts = await fetch(`http://localhost:5000/posts/${id}`);
        let json = await currPosts.json();
        setPosts([json.post]);
      }
    }

    getPosts().catch(console.error);
  }, [id])


  return (

    <div>
      {id == null ? 
        posts.map((post) => { 
          return (
            <div key={post._id}>
              <div>{post.title}</div>
              <div>{post.content}</div>
              <button id={post._id} onClick={clickHandler}>View post</button>
            </div>
          )
        }) : <SinglePost id={id} user={user} setUser={setUser}></SinglePost>}
      

      <button onClick={allClickHandler}>View All</button>
    </div>
  )
}