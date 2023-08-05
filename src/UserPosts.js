import { useContext, useEffect, useState } from "react"
import { ApiContext } from "./App";
import { Link } from "react-router-dom";

export const UserPosts = ({user}) => {
  const [posts, setPosts] = useState([]);
  const apiLink = useContext(ApiContext)

  useEffect(() => {
    const getPosts = async () => {
      if (user) {
        let currPosts = await fetch(`${apiLink}/users/${user._id}`);
        const json = await currPosts.json();
        setPosts(JSON.parse(json));
      }
    }

    getPosts().catch(console.error)
  }, [user, apiLink])

  return (
    <div className="posts-main">
      {user ? 
      <>
        <Link to="/add">Add New Post</Link>
          <div className="posts">
            {posts.map((post) => {
              return (
                <div className="post-summary" key={post._id}>
                  <div className="post-published">{post.published ? "Published" : "Not Published"}</div>
                  <div className="post-title">{post.title}</div>
                  <div className="post-content">{post.content}</div>
                  <div className="post-buttons">
                    <Link to={`/edit/${post._id}`}>Edit</Link>
                    <Link to={`/delete/${post._id}`}>Delete</Link>
                  </div>
                </div>
              )})} 
          </div> 
        </> :
        <div>Please <Link to="/login">login</Link> to view and edit your posts!</div>}
    </div>
  )
}