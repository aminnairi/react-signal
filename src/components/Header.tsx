import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about">
            About
          </Link>
        </li>
      </ul>
    </header>
  );
}