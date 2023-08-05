import { useContext, useEffect, useState } from "react"
import { ApiContext } from "../App";
import { Link } from "react-router-dom";
import { Post } from "../components/Post";

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
            return <Post post={post} userPost={true}></Post>
          })} 
        </div> 
      </> :
        <div>Please <Link to="/login">login</Link> to view and edit your posts!</div>}
    </div>
  )
}