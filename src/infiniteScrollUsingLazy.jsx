import axios from "axios";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

const LazyComponent = lazy(() => import("./lazyComponent"));

const InfiniteScrollWithSuspense = () => {
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
      console.log("Error occured!");
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, threshold: 0.1 }
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
      <h3>Infinite Scroll with React Suspense and Lazy loading</h3>
      <Suspense fallback={<p>Loading component...</p>}>
        <div>
          {posts?.map((post) => (
            <LazyComponent key={post.id} data={post} />
          ))}
        </div>
      </Suspense>
      {loading && <p>Loading more data...</p>}
      <div ref={loaderRef} style={{ height: "20px" }} />
    </div>
  );
};

export default InfiniteScrollWithSuspense;
