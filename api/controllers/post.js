import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Not valid token");

    const q = `SELECT p.*, u.id AS userId,name,profilePic FROM social.posts AS p JOIN social.users AS u ON (u.id = p.userId)
  LEFT JOIN relationships AS r ON (p.userId=r.followedUserId) WHERE r.followerUserId= ? OR p.userId=?
  ORDER BY p.createdAt DESC
  `;

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json("Interal server error");
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Not valid token");

    const q="INSERT INTO social.posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)";

    const values=[
        req.body.desc,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json("Interal server error");
      return res.status(200).json('Post has been created');
    });
  });
};
