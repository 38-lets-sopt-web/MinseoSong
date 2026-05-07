import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getUser } from "@/apis/users";
import { authStorage } from "@/utils/authStorage";

function MyPageLayout() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("내 정보");

  useEffect(() => {
    const fetchUserName = async () => {
      const storedUserId = authStorage.getUserId();

      if (!storedUserId) {
        return;
      }

      try {
        const user = await getUser(Number(storedUserId));
        setUserName(user.name);
      } catch {
        setUserName("SOPT 멤버");
      }
    };

    void fetchUserName();
  }, []);

  const handleLogout = () => {
    authStorage.clearUserId();
    navigate("/", { replace: true });
  };

  return (
    <div className="app-shell">
      <header className="page-header">
        <div className="header-brand">
          <strong>SOPT MEMBERS</strong>
          <p>안녕하세요, {userName}님!</p>
        </div>
        <nav className="header-nav" aria-label="마이페이지 메뉴">
          <NavLink end to="/mypage">
            내 정보
          </NavLink>
          <NavLink to="/mypage/users">회원 조회</NavLink>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </nav>
      </header>
      <Outlet context={{ refreshUserName: setUserName }} />
    </div>
  );
}

export default MyPageLayout;
