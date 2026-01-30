import db from "../config/db.js";



// Fetch Users From The Table

export const getAllUsers = (req,res)=>{
  const sql = "Select * from users ";
  db.query(sql,(err, result) => {
    if (err) {
      console.error('Error Fetching Users:', err);
      res.status(500).json({ error: 'Error ' });
      return;
    }
    console.log('Users successfully fetched');
    res.status(200).json({ data:result });
  });
}

