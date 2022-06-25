const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

const { client } = require("../config/db");
const auth = require("../middleware/auth");

//create a todo
router.post("/create", auth, async (req, res) => {
   try {
      const { description, completed } = req.body;
      const headers = req.headers;
      const token = headers["x-auth-token"];
      const user = jwt.decode(token, { complete: true });

      if (description?.length === 0 || completed?.length === 0) {
         res.status(400).send({ msg: "Add complete data" });
      }
      const newTodo = await client.query(
         "INSERT INTO todo (description,completed,user_id) VALUES($1,$2,$3) RETURNING *",
         [description, completed, user.payload.id]
      );
      res.json(newTodo.rows[0]);
   } catch (err) {
      console.error(err.message);
   }
});

//get all todos
router.get("/getAll", auth, async (req, res) => {
   try {
      const headers = req.headers;
      const token = headers["x-auth-token"];
      const user = jwt.decode(token, { complete: true });
      const userId = user.payload.id;
      const allTodos = await client.query(
         "SELECT * FROM todo where user_id= $1 LIMIT 10",
         [userId]
      );
      res.json(allTodos.rows);
   } catch (err) {
      console.error(err.message);
   }
});

//get counts
router.get("/count", auth, async (req, res) => {
   try {
      const headers = req.headers;
      const token = headers["x-auth-token"];
      const user = jwt.decode(token, { complete: true });
      const userId = user.payload.id;
      const completedTodos = await client.query(
         "SELECT * FROM todo where user_id=$1 and completed = true",
         [userId]
      );
      const notCompletedTodos = await client.query(
         "SELECT * FROM todo where user_id=$1 and completed = false",
         [userId]
      );
      res.send({
         completedTodos: completedTodos.rowCount,
         notCompletedTodos: notCompletedTodos.rowCount,
      });
   } catch (err) {
      console.error(err.message);
   }
});

//get a todo
router.get("/get/:id", auth, async (req, res) => {
   try {
      const { id } = req.params;
      const todo = await client.query("SELECT * FROM todo WHERE id = $1", [id]);
      res.json(todo.rows[0]);
   } catch (err) {
      console.error(err.message);
   }
});

//update a todo
router.put("/update/:id", auth, async (req, res) => {
   try {
      const { id } = req.params;
      const { description, completed } = req.body;
      const todo = await client.query("SELECT * FROM todo WHERE id = $1", [id]);
      if (todo.rows.length === 0) {
         res.status(400).send({ msg: "No Record Found for Id" });
      }
      if (description.length > 0) {
         const updateTodo = await client.query(
            "UPDATE todo SET description = $1 WHERE id = $2",
            [description, id]
         );
      }
      if (completed !== null || completed !== undefined) {
         const updateTodo = await client.query(
            "UPDATE todo SET completed = $1 WHERE id = $2",
            [completed, id]
         );
      }

      res.json("Todo was updated!");
   } catch (err) {
      console.error(err.message);
   }
});

//delete a todo
router.delete("/delete/:id", auth, async (req, res) => {
   try {
      const { id } = req.params;
      const deleteTodo = await client.query("DELETE FROM todo WHERE id = $1", [
         id,
      ]);
      res.json("Todo was deleted!");
   } catch (err) {
      console.error(err.message);
   }
});

module.exports = router;
