import { useContext, useEffect, useState } from "react";
import { AddComment } from "./AddComment";
import './styles/single-post.css'
import { ApiContext } from "./App";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "./helpers";

export const SinglePost = ({ user, setUser }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [addComment, setAddComment] = useState(false);
  const { pid } = useParams();
  const apiLink = useContext(ApiContext);

  const addClickHandler = () => {
    setAddComment(true);
  }

  useEffect(() => {
    let currComments = null;
    const getInfo = async () => {
      const currPosts = await fetch(`${apiLink}/posts/${pid}`);
      let json = await currPosts.json();
      setPost(json.post);

      currComments = await fetch(`${apiLink}/posts/${pid}/comments`);
      const commentJson = await currComments.json();
      setComments(JSON.parse(commentJson));
    }

    getInfo().catch(console.error)


  }, [addComment, apiLink, pid])

  return (
    <div className="post-detail">
      {post == null ? "" :
        <div className="post-content">
          <h1>{post.title}</h1>
          <div>{post.content}</div>
        </div>
      }
      <Link to="/">View All Posts</Link>

      
      <h2>Comments</h2>
      <div className="comments-section">
        {addComment ?
          <>
            <AddComment id={pid} user={user} setUser={setUser} setAddComment={setAddComment} />
          </> :
          <button onClick={addClickHandler}>Add Comment</button>
        }
        <div className="comments">
          {comments == null ? "" : comments.map((comment) => {
            return (
              <div className="comment" key={comment._id}>
                <div className="comment-content">{comment.content}</div>
                <div>Written by {comment.created_by.username} on {formatDate(new Date(comment.timestamp))}</div>
              </div>
            )
          })}
        </div>
      </div>
      
    </div>
  )

}