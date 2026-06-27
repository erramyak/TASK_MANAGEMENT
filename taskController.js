const db = require("../config/db");

exports.createTask=(req,res)=>{

 const {title,description,status}
 = req.body;

 db.query(
 "INSERT INTO tasks(user_id,title,description,status) VALUES(?,?,?,?)",
 [
  req.user.id,
  title,
  description,
  status
 ],
 (err,result)=>{

 if(err)
 return res.status(500).json(err);

 res.json({
  message:"Task Created"
 });

 });
};

exports.getTasks=(req,res)=>{

 db.query(
 "SELECT * FROM tasks WHERE user_id=?",
 [req.user.id],
 (err,result)=>{

 if(err)
 return res.status(500).json(err);

 res.json(result);

 });
};

exports.updateTask=(req,res)=>{

 const {title,description,status}
 = req.body;

 db.query(
 "UPDATE tasks SET title=?,description=?,status=? WHERE id=?",
 [
  title,
  description,
  status,
  req.params.id
 ],
 (err,result)=>{

 res.json({
  message:"Task Updated"
 });

 });
};

exports.deleteTask=(req,res)=>{

 db.query(
 "DELETE FROM tasks WHERE id=?",
 [req.params.id],
 ()=>{

 res.json({
  message:"Task Deleted"
 });

 });
};