import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { ApiContext } from "../App";

export const DeletePost = ({ user }) => {
  const apiLink = useContext(ApiContext);
  const { pid } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([])
  
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

  }, [apiLink, pid]);
}