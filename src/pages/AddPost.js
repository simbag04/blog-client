import { useContext, useEffect, useState } from "react"
import { ApiContext } from "../App"
import { Link, useNavigate } from "react-router-dom";
import '../styles/addpost.css'

export const AddPost = ({ user, post }) => {
  const nav = useNavigate();
  const apiLink = useContext(ApiContext);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({published: false});

  useEffect(() => {
    if (post != null) {
      setFormData(post);
    }
  }, [post])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })  
  }

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.checked
    }) 
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const link = post ? `${apiLink}/posts/${post._id}` : `${apiLink}/posts`
      const meth = post ? "put" : "post"
      const res = await fetch(link, {
        method: meth,
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + localStorage.getItem("token")
        }
      })
  
      const json = await res.json();
      if (!json.success) {
        setMessage(json.message);
      } else {
        nav('/user/posts');
      }

    } catch (err) {
    }
  }
  
  const cancelHandler = () => {
    nav('/user/posts')
  }

  return (
    <div className="content-body add-post-form">
      {user ? 
        <>
          <h1>{post ? "Edit" : "Add a"} Post</h1> 
          <form onSubmit={formSubmitHandler}>
            <label htmlFor="title">
              <input id="title"
                      type="text"
                      required={true}
                      placeholder="Title"
                      defaultValue={post ? post.title : ""}
                      onChange={handleInputChange}>

              </input>
            </label>
            <label htmlFor="content">
              <textarea id="content"
                        type="text"
                        required={true}
                        placeholder="Content"
                        defaultValue={post ? post.content : ""}
                        onChange={handleInputChange}
                        rows={15}>

              </textarea>
            </label>
            <label htmlFor="published">
              <span className="published-input">
                <div>
                <input type="checkbox" 
                    id="published"
                    onChange={handleCheckboxChange} />
                </div>
                <div>
                  Published?
                </div>
              </span>
            </label>
            <div className="horizontal-buttons">
              <button type="submit">{post ? "Edit" : "Add"} Post</button>
              <button type="button" onClick={cancelHandler}>Cancel</button>
            </div>
          </form>
        </> :
        <div>Please <Link to="/login">login</Link> to create, view, and edit your posts!</div>}
        <div>
          {message == null ? "" :
            message.map((mess, index) => {
              return <div key={index}>{mess.msg === undefined ? mess : mess.msg}</div>
            })}
        </div>
    </div>
  )
}