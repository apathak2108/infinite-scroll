import React from "react";
import InfiniteScroll from "./infiniteScroll";
import InfiniteScrollWithSuspense from "./infiniteScrollUsingLazy";

const App = () => {
  return (
    <div>
      {/* <InfiniteScroll /> */}
      <InfiniteScrollWithSuspense />
    </div>
  );
};

export default App;
