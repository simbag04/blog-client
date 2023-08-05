import { useContext, useEffect, useState } from "react";
import '../styles/posts.css'
import { ApiContext } from "../App";
import { Link } from "react-router-dom";
import { Post } from "../components/Post";

export function Posts({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  const apiLink = useContext(ApiContext);

  useEffect(() => {
    const getPosts = async () => {
      let currPosts = await fetch(`${apiLink}/posts`);
      const json = await currPosts.json();
      setPosts(JSON.parse(json));

    }

    getPosts().catch(console.error);
  }, [apiLink])


  return (
    <div className="posts-main">
        <h1>All Posts</h1>
        { user ? 
          <div><Link to="/user/posts">View and edit your posts</Link></div> :
          <div>Please <Link to="/login">login</Link> to create and edit posts!</div>
        }
        <div className="posts">
          {posts.map((post) => {
            return <Post key={post._id} post={post} viewPost={true}></Post>
          })}
        </div>
    </div>
  )
}