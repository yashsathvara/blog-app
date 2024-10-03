// src/components/Home.js
import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, onValue, push, update, remove } from "firebase/database";
import { Link } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    const postsRef = ref(database, "posts");
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const postsArray = [];
      for (let id in data) {
        postsArray.push({ id, ...data[id] });
      }
      setPosts(postsArray);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postsRef = ref(database, "posts");
    const post = {
      title,
      description,
      imageUrl,
    };
    if (editing) {
      const postRef = ref(database, `posts/${currentPostId}`);
      update(postRef, post);
      setEditing(false);
      setCurrentPostId(null);
    } else {
      push(postsRef, post);
    }
    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  const handleEdit = (post) => {
    setEditing(true);
    setCurrentPostId(post.id);
    setTitle(post.title);
    setDescription(post.description);
    setImageUrl(post.imageUrl);
  };

  const handleDelete = (id) => {
    const postRef = ref(database, `posts/${id}`);
    remove(postRef);
  };

  return (
    <div className="container">
    <h2>Create a Personal Blog App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">{editing ? "Update Post" : "Submit"}</button>
      </form>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
            <Link to={`/post/${post.id}`}>Read more</Link>
            <button className="edit-button" onClick={() => handleEdit(post)}>
              Edit
            </button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
