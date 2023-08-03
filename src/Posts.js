import { useContext, useEffect, useState } from "react";
import { SinglePost } from "./SinglePost";
import './styles/posts.css'
import { ApiContext } from "./App";

export function Posts({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(null);
  const apiLink = useContext(ApiContext);
  const clickHandler = (e) => {
    setId(e.target.id);
  }

  useEffect(() => {
    const getPosts = async () => {
      let currPosts = null;
      if (id === null) {
        currPosts = await fetch(`${apiLink}/posts`);
        const json = await currPosts.json();
        setPosts(JSON.parse(json));
      } else {
        currPosts = await fetch(`${apiLink}/posts/${id}`);
        let json = await currPosts.json();
        setPosts([json.post]);
      }
    }

    getPosts().catch(console.error);
  }, [id])


  return (
    <div className="posts-main">
      {id == null ? <h1>Posts</h1> : null}
      {id == null ?
        <div className="posts">
          {posts.map((post) => {
            return (
              <div className="post-summary" key={post._id}>
                <div className="post-title">{post.title}</div>
                <div className="post-content">{post.content}</div>
                <button id={post._id} onClick={clickHandler}>View post</button>
              </div>
            )})}
        </div> :
        <SinglePost id={id} setId={setId} user={user} setUser={setUser}></SinglePost>}
    </div>
  )
}