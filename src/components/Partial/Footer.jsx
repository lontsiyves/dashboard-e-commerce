import React from "react";

export default function Footer() {

  let getYear = () => {
    let currentYear = new Date().getFullYear();
    return currentYear;
};
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>&copy; {getYear()} ennov</span>
        </div>
      </div>
    </footer>
  );
}

