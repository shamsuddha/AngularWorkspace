import { PostDto } from './../src/app/simple_social_app/dto/PostDto';
import { PostLikeDto } from './../src/app/simple_social_app/dto/PostLikeDto';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Datastore from 'nedb';
import { PostSearchDto } from "./dto/request/PostSearchDto";
import { UserSearchDto } from "./dto/request/UserSearchDto";
import { CommentSearchDto } from "./dto/request/CommentSearchDto";
import { CommentDto } from "./dto/CommentDto";
import { CommentLikeDto } from './dto/CommentLikeDto';

const userTable = new Datastore({ filename: 'db/user.db', autoload: true });
const postTable = new Datastore({ filename: 'db/post.db', autoload: true });
const commentTable = new Datastore({ filename: 'db/comment.db', autoload: true });
const postLikeTable = new Datastore({ filename: 'db/postLike.db', autoload: true });
const commentLikeTable = new Datastore({ filename: 'db/commentLike.db', autoload: true });


import { Pool } from 'pg';

const pool = new Pool ({
  max: 20,
  //connectionString: 'postgres://username:password@localhost:port/dbname',
  connectionString: 'postgres://user1:123456@localhost:9091/db1',
  idleTimeoutMillis: 30000
});

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.post('/test', async (req, res) => {

  try {
    const client = await pool.connect();
    const sql = "SELECT * FROM test";
    const {rows} = await client.query(sql);
    const todos = rows;
    console.log(todos)
    client.release();
    res.json(todos)
  } catch (error) {
    res.status(400).send(error);
  }
});


app.post('/test2', async (req, res) => {

  try {
    const client = await pool.connect();
    const sql = "insert into test values ('101',1010,'2022-12-28 04:08:19.124944','2022-12-28',1100.50,true)";
    const {rows} = await client.query(sql);
    const todos = rows;
    console.log(todos)
    client.release();
    res.json(todos)
  } catch (error) {
    res.status(400).send(error);
  }
});


app.post('/user/save', (req, res) => {
  userTable.insert(req.body, (err, newDoc) => {
    res.json(newDoc)
  });
});

app.post('/user/search', (req, res) => {
  const userSearchDto: UserSearchDto = new UserSearchDto(req.body)
  let predicate = {};
  if (userSearchDto.idList.length > 0) {
    predicate = { ...predicate, id: { $in: userSearchDto.idList } };
  }
  userTable.find(predicate, (err, docs) => {
    res.json(docs)
  });
});


app.post('/post/save', (req, res) => {
  const postDto: PostDto = new PostDto(req.body);
  postTable.find({}).sort({ id: -1 })
    .exec((err, docs) => {
      if (docs && docs.length > 0) {
        postDto.id = docs[0]['id'] + 1;
        postTable.insert(postDto, (err, newDoc) => {
          res.json(newDoc);
        });
      } else {
        postDto.id = 1;
        postTable.insert(postDto, (err, newDoc) => {
          res.json(newDoc);
        });
      }
    });
});

app.post('/post/search', (req, res) => {
  const postSearchDto: PostSearchDto = new PostSearchDto(req.body);
  let predicate = {};
  if (postSearchDto.idList.length > 0) {
    predicate = { ...predicate, id: { $in: postSearchDto.idList } };
  }
  if (postSearchDto.userId) {
    predicate = { ...predicate, "userDto.id": req.body['userId'] };
  }
  postTable.find(predicate, (err, docs) => {
    res.json(docs);
  });
});

app.post('/comment/save', (req, res) => {
  const commentDto: CommentDto = new CommentDto(req.body);
  commentTable.find({}).sort({ id: -1 })
    .exec((err, docs) => {
      if (docs && docs.length > 0) {
        commentDto.id = docs[0]['id'] + 1;
        commentTable.insert(commentDto, (err, newDoc) => {
          res.json(newDoc);
        });
      } else {
        commentDto.id = 1;
        commentTable.insert(commentDto, (err, newDoc) => {
          res.json(newDoc);
        });
      }
    });
});

app.post('/comment/search', (req, res) => {

  const commentSearchDto: CommentSearchDto = new CommentSearchDto(req.body);
  let predicate = {};
  if (commentSearchDto.idList.length > 0) {
    predicate = { ...predicate, id: { $in: commentSearchDto.idList } };
  }
  if (commentSearchDto.postId) {
    predicate = { ...predicate, "postDto.id": commentSearchDto.postId };
  }
  commentTable.find(predicate, (err, docs) => {
    res.json(docs)
  });
})

app.post('/postLike/save', (req, res) => {

  const postLikeDto: PostLikeDto = new PostLikeDto(req.body);
  postLikeTable.find({}).sort({ id: -1 })
    .exec((err, docs) => {
      if (docs && docs.length > 0) {
        postLikeDto.id = docs[0]['id'] + 1;
        postLikeTable.insert(postLikeDto, (err, newDoc) => {
          res.json(newDoc);

        });
      } else {
        postLikeDto.id = 1;
        postLikeTable.insert(postLikeDto, (err, newDoc) => {
          res.json(newDoc);

        });
      }
    });

<<<<<<< HEAD
    
  // Post table theke like count cont column e +1 dite hobe tar jonno
  // req. body te jei post dto ashbe tar id er sathe post table er id match kore oita akta variable er moddhe nite hobe
  // oi post er like count column er value +1 korte hobe.

});

app.post('/commentLike/save', (req, res) => {
=======
    // Post table theke like count cont column e +1 dite hobe tar jonno
    // req. body te jei post dto ashbe tar id er sathe post table er id match kore oita akta variable er moddhe nite hobe
    // oi post er like count column er value +1 korte hobe.





});



app.post('/commentLike/save', (req, res) => {

>>>>>>> eafac18e11a985e870a09815e41bbb04bd667d42

  console.log("hello world");
  const commentLikeDto: CommentLikeDto = new CommentLikeDto(req.body);
  commentLikeTable.find({}).sort({ id: -1 })
    .exec((err, docs) => {
      if (docs && docs.length > 0) {
        commentLikeDto.id = docs[0]['id'] + 1;
        commentLikeTable.insert(commentLikeDto, (err, newDoc) => {
          res.json(newDoc);

        });
      } else {
        commentLikeDto.id = 1;
        commentLikeTable.insert(commentLikeDto, (err, newDoc) => {
          res.json(newDoc);

        });
      }
    });

});


app.post('/commentLike/save', (req, res) => {
<<<<<<< HEAD
  //console.log("hello world");
=======


  console.log("hello world");
>>>>>>> eafac18e11a985e870a09815e41bbb04bd667d42
  const commentLikeDto: CommentLikeDto = new CommentLikeDto(req.body);
  commentLikeTable.find({}).sort({ id: -1 })
    .exec((err, docs) => {
      if (docs && docs.length > 0) {
        commentLikeDto.id = docs[0]['id'] + 1;
        commentLikeTable.insert(commentLikeDto, (err, newDoc) => {
          res.json(newDoc);

        });
      } else {
        commentLikeDto.id = 1;
        commentLikeTable.insert(commentLikeDto, (err, newDoc) => {
          res.json(newDoc);
<<<<<<< HEAD
=======

>>>>>>> eafac18e11a985e870a09815e41bbb04bd667d42
        });
      }
    });

});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
