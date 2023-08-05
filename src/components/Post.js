import { Link } from "react-router-dom"
import { formatDate } from '../helpers.js'

export const Post = ({ post, userPost, viewPost }) => {
  return (
    <div className="post-summary" key={post._id}>
      {userPost ?                   
        <div className="post-published">{post.published ? "Published" : "Not Published"}</div> : null}
      <div className="post-title">{post.title}</div>
      <div className="post-content">{post.content}</div>
      <div>Created {userPost ? "" : `by ${post.created_by.username}`} on {formatDate(new Date(post.timestamp))}</div>
      {viewPost ? <Link to={`/post/${post._id}`}>View Post</Link> : null}
      {userPost ?
        <div className="horizontal-buttons">
          <Link to={`/edit/${post._id}`}>Edit</Link>
          <Link to={`/delete/${post._id}`}>Delete</Link>
        </div> : null}
    </div>
  )
}