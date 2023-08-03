import { useState } from "react"
import { Link } from "react-router-dom";

export const AddComment = ({id, user, setUser, setAddComment}) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })  
  }

  const cancelAddHandler =  () => {
    setAddComment(false)
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}/comments`, {
        method: 'post',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + localStorage.getItem("token")
        }
      })
      
      if (res.status === 401) {
        setUser(null)
      } else {
        setAddComment(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <input type="text" 
                required={true} 
                id="content" 
                placeholder="Comment" 
                onChange={handleInputChange}>
        </input>
        {user ?   
          <>
            <button type="submit">Add Comment</button>
            <button onClick={cancelAddHandler}>Cancel</button>
          </>
          : 
          <div>Please <Link to="/login">login</Link> to add this comment!</div>}
      </form>
    </div>
  )
}