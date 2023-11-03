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
        <li>
          <Link to="/theme">
            Theme
          </Link>
        </li>
      </ul>
    </header>
  );
}