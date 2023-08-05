import { useContext, useState } from "react"
import { ApiContext } from "./App"
import { Link, useNavigate } from "react-router-dom";
import './styles/addpost.css'

export const AddPost = ({ user }) => {
  const nav = useNavigate();
  const apiLink = useContext(ApiContext);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })  
  }
  
  const cancelHandler = () => {
    nav('/user/posts')
  }

  return (
    <div className="content-body add-post-form">
      {user ? 
        <>
          <h1>Add a Post</h1> 
          <form>
            <label htmlFor="title">
              <input id="title"
                      type="text"
                      required={true}
                      placeholder="Title"
                      onChange={handleInputChange}>

              </input>
            </label>
            <label htmlFor="content">
              <textarea id="content"
                        type="text"
                        required={true}
                        placeholder="Content"
                        onChange={handleInputChange}
                        rows={15}>

              </textarea>
            </label>
            <label htmlFor="published">
              <span className="published-input">
                <div>
                  <input type="checkbox"></input> 
                </div>
                <div>
                  Published?
                </div>
              </span>
            </label>
              <button type="submit">Add Post</button>
              <button type="button" onClick={cancelHandler}>Cancel</button>
          </form>
        </> :
        <div>Please <Link to="/login">login</Link> to create, view, and edit your posts!</div>
      }
    </div>
  )
}