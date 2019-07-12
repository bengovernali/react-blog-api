const db = require("./conn.js");

// @TODO = convert the delete and update methods to instance methods

class Posts {
  constructor(id, title, author, content) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.title = title;
  }

  static async getAll() {
    try {
      const response = await db.any(`SELECT * FROM posts;`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getById(p_id) {
    try {
      const response = await db.one(`SELECT * FROM posts WHERE id = ${p_id};`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async removeEntry(p_id) {
    try {
      const response = await db.result(`DELETE FROM posts WHERE id = ${p_id};`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async createEntry(title, content, author_id) {
    const query = `INSERT INTO posts (title, content, author_id) VALUES ('${title}', '${content}', ${author_id});`;

    try {
      let response = await db.result(query);
      console.log("model", response);
      return response;
    } catch (err) {
      // console.log('error : ', err);
      return err.message;
    }
  }

  static async updateEntry(id, column, content) {
    const query = `UPDATE posts SET ${column} = '${content}' WHERE id = ${id};`;

    try {
      const response = await db.result(query);
      console.log("response is ", response);
      return response;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
}

module.exports = Posts;
