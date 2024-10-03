// src/components/BlogPost.js
import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import "../index.css";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const postRef = ref(database, `posts/${id}`);
    onValue(postRef, (snapshot) => {
      setPost(snapshot.val());
    });
  }, [id]);

  return (
    <div className="container">
      {post && (
        <>
          <h1>{post.title}</h1>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="blog-post-image"
          />
          <p>{post.description}</p>
        </>
      )}
    </div>
  );
};

export default BlogPost;
