import React from "react";

export default function DefaultLayout({ children }) {
  return (
    <div className="App">
      <div id="wrapper">{children}</div>
    </div>
  );
}


