import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer page__footer">
      <p className="footer__copyright">&copy;{year} Marine animal world</p>
    </footer>
  );
}

export default Footer;
