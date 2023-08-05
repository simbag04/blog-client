import { useParams } from "react-router-dom"
import { SinglePost } from "./SinglePost";

export const DeletePost = ({ user }) => {
  const { pid } = useParams();

  return (
    <div className="content-body">
      <h1>Are you sure you want to delete this post?</h1>
      <div className="horizontal-buttons">
        <button>Yes</button>
        <button>No, go home</button>
      </div>
      <SinglePost user={user} deleteId={pid}></SinglePost>
    </div>
  )
}