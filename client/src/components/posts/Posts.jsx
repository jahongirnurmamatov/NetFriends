import Post from "../post/Post";
import "./posts.scss";

//temporary post datas
const posts = [
  {
    id: 1,
    name: "Alice Johnson",
    userId: 101,
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    img: "https://images.pexels.com/photos/707344/pexels-photo-707344.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: "Exploring the beauty of nature. #nature #adventure",
  },
  {
    id: 2,
    name: "Michael Smith",
    userId: 102,
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    desc: "City lights and late nights. #cityscape #urbanlife",
  },
  {
    id: 3,
    name: "Jessica Williams",
    userId: 103,
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    img: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514",
    desc: "Cozy winter vibes. #winter #cozy",
  },
  {
    id: 4,
    name: "David Brown",
    userId: 104,
    profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    desc: "Weekend getaway in the mountains. #travel #mountains",
  },
];

const Posts = () => {
  return (
    <div className="posts">
      {posts.map((post) => (   
          <Post post={post}  key={post.id}/> 
      ))}
    </div>
  );
};

export default Posts;
