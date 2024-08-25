import { useContext } from 'react';
import './comments.scss'
import { AuthContext } from '../../context/authContext';

//fake comments
const comments = [
    {
      id: 1,
      desc: "Amazing shot! The colors are breathtaking.",
      name: "Emily Clark",
      userId: 201,
      profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 2,
      desc: "Looks like a fantastic place to visit!",
      name: "John Doe",
      userId: 202,
      profilePic: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    {
      id: 3,
      desc: "Wow, the scenery is stunning!",
      name: "Sophia Martinez",
      userId: 203,
      profilePic: "https://randomuser.me/api/portraits/women/72.jpg",
    },
    {
      id: 4,
      desc: "Such a cozy atmosphere in this picture.",
      name: "James Lee",
      userId: 204,
      profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
    },
    {
      id: 5,
      desc: "Love the vibe of this photo!",
      name: "Olivia Brown",
      userId: 205,
      profilePic: "https://randomuser.me/api/portraits/women/47.jpg",
    },
  ];

const Comments = () => {
    const {currentUser}=useContext(AuthContext)

  return (
    <div className='comments'>
        <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder='Comment here' />
            <button>Send</button>
        </div>
        {comments.map((comment)=>(
            <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className='date'>1 hour ago</span>
            </div>
        ))}
    </div>
  )
}

export default Comments