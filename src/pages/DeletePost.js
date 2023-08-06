import { useNavigate, useParams } from "react-router-dom"
import { SinglePost } from "./SinglePost";
import { ApiContext } from "../App";
import { useContext } from "react";

export const DeletePost = ({ user }) => {
  const nav = useNavigate();
  const apiLink = useContext(ApiContext);
  const { pid } = useParams();

  const deleteHandler = async () => {
    try {
      const res = await fetch(`${apiLink}/posts/${pid}`, {
        method: 'delete',
        headers: {
          'Authorization': 'bearer ' + localStorage.getItem("token")
        }
      })

      const json = await res.json();
      if (json.success) {
        nav('/user/posts')
      }
    } catch (err) {}
  }

  return (
    <div className="content-body">
      <h1>Are you sure you want to delete this post?</h1>
      <div className="horizontal-buttons">
        <button onClick={deleteHandler}>Yes</button>
        <button>No, go home</button>
      </div>
      <SinglePost user={user} deleteId={pid}></SinglePost>
    </div>
  )
}