import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ApiContext } from "../App";
import { AddPost } from "./AddPost";
import { Comments } from "../components/Comments";

export const EditPost = ({ user }) => {
  const { pid } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const apiLink = useContext(ApiContext);

  useEffect(() => {
    let currComments = null;
    const getInfo = async () => {
      const currPosts = await fetch(`${apiLink}/posts/${pid}`);
      let json = await currPosts.json();
      setPost(json.post);
      document.querySelector("#published").checked = json.post.published


      currComments = await fetch(`${apiLink}/posts/${pid}/comments`);
      const commentJson = await currComments.json();
      setComments(JSON.parse(commentJson));
    }

    getInfo().catch(console.error)

  }, [apiLink, pid]);

  return (
    <div>
      {post != null && user._id === post.created_by ? 
        <>
          <AddPost user={user} post={post}></AddPost>
          <div className="comments-section">
            <h2>Comments</h2>
            <Comments comments={comments}></Comments>
          </div>
        </> :
        <div>You are not authorized to access this!</div>}
    </div>
  )

}

