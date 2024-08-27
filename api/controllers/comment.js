import { db } from "../connect.js";
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId,name,profilePic FROM social.comments AS c JOIN social.users AS u ON (u.id = c.userId)
    WHERE c.postId= ?
    ORDER BY c.createdAt DESC
    `;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json("Interal server error");
    return res.status(200).json(data);
  });
};

export const addComments = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Not valid token");

    const q =
      "INSERT INTO social.comments (`desc`, `userId`, `createdAt`, `postId`) VALUES (?)";

    const values = [
      req.body.desc,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.postId
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json("Interal server error");
      return res.status(200).json("Comment has been created");
    });
  });
};
