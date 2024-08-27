import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import Update from "../../components/update/Update";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate,setOpenUpdate]=useState(false);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest.get(`/users/find/${userId}`).then((res) => res.data),
  });
  const { data: relationshipData } = useQuery({
    queryKey: ["relationships"],
    queryFn: () =>
      makeRequest
        .get(`/relationships?followedUserId=${userId}`)
        .then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (isFollowing) => {
      if(isFollowing){
        makeRequest.delete("/relationships?userId="+userId);
      }else{
        makeRequest.post('/relationships?userId=?',{userId});
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationships"]);
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  return (
    <div className="profile">
      {isLoading ? (
        "Loading...."
      ) : (
        <>
          <div className="images">
            <img src={data?.cover || "/cover.jpg"} alt="" className="cover" />
            <img
              src={data?.profilePic || "/profile.png"}
              alt=""
              className="profile"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data?.name}</span>
                <div className="info">
                  {data?.city && (
                    <div className="item">
                      <PlaceIcon />
                      <span>{data.city}</span>
                    </div>
                  )}
                  {data?.webiste && (
                    <div className="item">
                      <LanguageIcon />
                      <span>{data.website}</span>
                    </div>
                  )}
                </div>
                {userId === currentUser.id ? (
                  <button onClick={()=>setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData?.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} />}
    </div>
  );
};

export default Profile;
