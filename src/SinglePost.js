  import { useEffect, useState } from "react";
import { AddComment } from "./AddComment";

  export const SinglePost = ({id, user, setUser}) => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [addComment, setAddComment] = useState(false);

    const addClickHandler = () => {
      setAddComment(true);
    }

    useEffect(() => {
      let currComments = null;
      const getInfo = async () => {
        const currPosts = await fetch(`http://localhost:5000/posts/${id}`);
        let json = await currPosts.json();
        setPost(json.post);
    
        currComments = await fetch(`http://localhost:5000/posts/${id}/comments`);
        const commentJson = await currComments.json();
        setComments(JSON.parse(commentJson));
      }

      getInfo().catch(console.error)


    }, [id, addComment])

    return (
      <div>
        Post
        {post == null ? "" : 
            <div>
              <div>{post.title}</div>
              <div>{post.content}</div>
            </div>
        }

        Comments
        <div>
          {comments == null ? "" : comments.map((comment) => {
            return (
              <div key={comment._id}>
                <div>{comment.content}</div>
                <div>Written by: {comment.created_by.username}</div>
              </div>
            )
          })}
          {addComment ? 
            <AddComment id={id} user={user} setUser={setUser} setAddComment={setAddComment}/> : 
            <button onClick={addClickHandler}>Add Comment</button>}
        </div>
      </div>
    )

  }