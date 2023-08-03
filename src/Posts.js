import { useEffect, useState } from "react";
import { SinglePost } from "./SinglePost";
import './styles/posts.css'

export function Posts({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(null);
  const clickHandler = (e) => {
    setId(e.target.id);
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