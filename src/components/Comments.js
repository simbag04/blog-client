import { formatDate } from "../helpers"

export const Comments = ({ comments }) => {
  return (
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
  )
}