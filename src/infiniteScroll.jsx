import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = res.data;
      setPosts((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error occured");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
          console.log(entries, "entries");
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div>
      <h3>Infinite scroll demo</h3>
      <div>
        {posts?.map((post) => (
          <div
            key={post.id}
            style={{ border: "1px solid black", marginBottom: "10px" }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {/* This is the sentinel element */}
      <div ref={loaderRef} style={{ height: "20px" }}></div>
    </div>
  );
};

export default InfiniteScroll;
