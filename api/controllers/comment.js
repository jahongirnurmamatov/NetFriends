import { db } from "../connect.js";

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
