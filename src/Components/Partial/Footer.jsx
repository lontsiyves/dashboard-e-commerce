import React from "react";

export default function Footer() {
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>&copy; {new Date().getFullYear()} ennov</span>
        </div>
      </div>
    </footer>
  );
}
