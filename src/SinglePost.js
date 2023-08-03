import { useContext, useEffect, useState } from "react";
import { AddComment } from "./AddComment";
import './styles/single-post.css'
import { ApiContext } from "./App";

export const SinglePost = ({ id, setId, user, setUser }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [addComment, setAddComment] = useState(false);
  const apiLink = useContext(ApiContext);

  const allClickHandler = () => {
    setId(null);
  }

  const addClickHandler = () => {
    setAddComment(true);
  }

  useEffect(() => {
    let currComments = null;
    const getInfo = async () => {
      const currPosts = await fetch(`${apiLink}/posts/${id}`);
      let json = await currPosts.json();
      setPost(json.post);

      currComments = await fetch(`${apiLink}/posts/${id}/comments`);
      const commentJson = await currComments.json();
      setComments(JSON.parse(commentJson));
    }

    getInfo().catch(console.error)


  }, [id, addComment])

  return (
    <div className="post-detail">
      {post == null ? "" :
        <div className="">
          <h1>{post.title}</h1>
          <div>{post.content}</div>
        </div>
      }
      <button onClick={allClickHandler}>View All Posts</button>

      <h2>Comments</h2>
      <div className="comments-section">
        {addComment ?
          <>
            <AddComment id={id} user={user} setUser={setUser} setAddComment={setAddComment} />
          </> :
          <button onClick={addClickHandler}>Add Comment</button>
        }
        <div className="comments">
          {comments == null ? "" : comments.map((comment) => {
            return (
              <div className="comment" key={comment._id}>
                <div className="comment-content">{comment.content}</div>
                <div>Written by: {comment.created_by.username}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

}