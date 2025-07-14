import "./Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <p>📅 NoteNest &copy; {new Date().getFullYear()}</p>
      <div className="footer-links">
        <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
          <FaGithub /> GitHub
        </a>
        <a href="www.linkedin.com/in/navneet-jaiswal-8aa05b322" target="_blank" rel="noreferrer">
          <FaLinkedin /> LinkedIn
        </a>
        <a href="mailto:your.email@example.com">
          <FaEnvelope /> Contact
        </a>
      </div>
    </footer>
  );
}
