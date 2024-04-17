const express = require('express');
const mysql = require('mysql2'); 
const bodyParser = require('body-parser');

app.use(bodyParser.json())
const port = 3000

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'study'
})

pp.post('/comments', async (req, res) => {
    try {
      const { contentIdx, userIdx, comment, responseTo } = req.body;
  
      const result = await addComment(contentIdx, userIdx, comment, responseTo);
  
      if (!result) {
        return res.status(500).json({ error: '댓글을 추가하는 도중 오류가 발생했습니다.' });
      }
  
      const commentData = await getCommentData(result.insertId);
  
      res.status(201).json(commentData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '댓글을 추가하는 도중 오류가 발생했습니다.' });
    }
  });
  
  // async 함수를 이용하여 데이터베이스에 댓글 추가
  async function addComment(contentIdx, userIdx, comment, responseTo) {
    try {
      const sql = responseTo
        ? 'INSERT INTO comments(content_idx, user_idx, comment, response_to) VALUES (?, ?, ?, ?)'
        : 'INSERT INTO comments(content_idx, user_idx, comment) VALUES (?, ?, ?)';
      const values = responseTo ? [contentIdx, userIdx, comment, responseTo] : [contentIdx, userIdx, comment];
  
      const [result] = await pool.execute(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

app.listen(port, () => {
    console.log(`서버 :  ${port}`);
  });