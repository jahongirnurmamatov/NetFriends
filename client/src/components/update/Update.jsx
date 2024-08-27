import { useContext, useState } from "react";
import "./update.scss";
import { Modal } from "@mui/material";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate }) => {
  const { currentUser } = useContext(AuthContext);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (currentUser) => makeRequest.put("/users", currentUser),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : currentUser.coverPic;
    profileUrl = profile ? await upload(profile) : currentUser.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };
  return (
    <div className="update">
      Update
      <form>
        <input type="file" onChange={(e)=>setCover(e.target.files[0])}/>
        <input type="file"  onChange={(e)=>setProfile(e.target.files[0])}/>
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="city" onChange={handleChange} />
        <input type="text" name="website" onChange={handleChange} />
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>Close</button>
    </div>
  );
};

export default Update;
