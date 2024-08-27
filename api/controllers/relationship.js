import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getRelationship = (req, res) => {
  const q =
    "SELECT followerUserId from social.relationships WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(200).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};
export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Not valid token");

    const q =
      "INSERT INTO social.relationships (`followerUserId`, `followedUserId`) VALUES (?)";

    const values = [userInfo.id, req.body.userId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json("Interal server error");
      return res.status(200).json("Following");
    });
  });
};
export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Not valid token");

    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
    
  });
};
