import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Link to="/main">
      <div style={{ width: 60, height: 50 }}>시퀀서 페이지로 가기</div>
    </Link>
  );
}
