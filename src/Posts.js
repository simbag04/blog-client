import { useContext, useEffect, useState } from "react";
import './styles/posts.css'
import { ApiContext } from "./App";
import { Link } from "react-router-dom";

export function Posts({ user, setUser, formatDate }) {
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
            return (
              <div className="post-summary" key={post._id}>
                <div className="post-title">{post.title}</div>
                <div className="post-content">{post.content}</div>
                <div>Created by {post.created_by.username} on {formatDate(new Date(post.timestamp))}</div>
                <Link to={`/post/${post._id}`}>View Post</Link>
              </div>
            )})}
        </div>
    </div>
  )
}