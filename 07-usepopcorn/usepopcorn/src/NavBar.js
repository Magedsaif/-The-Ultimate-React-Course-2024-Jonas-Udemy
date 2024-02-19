import { Logo } from "./Logo";

export function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo></Logo>
      {children}
    </nav>
  );
}
