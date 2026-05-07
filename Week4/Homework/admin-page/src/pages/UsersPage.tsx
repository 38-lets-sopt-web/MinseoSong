import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, getUsers } from '@/apis/users';
import ErrorMessage from '@/components/ErrorMessage';
import { InputField } from '@/components/FormField';
import Loading from '@/components/Loading';
import type { UserProfile, UserSummary } from '@/types/user';

function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [searchedUser, setSearchedUser] = useState<UserProfile | null>(null);
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const canSearch = searchId.trim() !== '' && !isSearching;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : '회원 목록을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUsers();
  }, []);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSearch) {
      return;
    }

    try {
      setIsSearching(true);
      setErrorMessage('');
      setSearchedUser(await getUser(Number(searchId)));
    } catch (error) {
      setSearchedUser(null);
      setErrorMessage(error instanceof Error ? error.message : '회원을 조회하지 못했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="page-container members-page">
      <section className="section-panel">
        <div className="section-heading">
          <span className="eyebrow">Members</span>
          <h1>회원 조회</h1>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <InputField
            inputMode="numeric"
            label="회원 ID"
            min="1"
            name="searchId"
            placeholder="ID를 입력하세요"
            type="number"
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
          />
          <button className="primary-button" disabled={!canSearch} type="submit">
            <Search size={16} />
            검색
          </button>
        </form>
        <div className="result-section">
          <h2>검색 결과</h2>
          {searchedUser ? (
            <article className="detail-card">
              <dl className="result-info">
                <div>
                  <dt>아이디</dt>
                  <dd>{searchedUser.loginId}</dd>
                </div>
                <div>
                  <dt>이름</dt>
                  <dd>{searchedUser.name}</dd>
                </div>
                <div>
                  <dt>이메일</dt>
                  <dd>{searchedUser.email}</dd>
                </div>
                <div>
                  <dt>나이</dt>
                  <dd>{searchedUser.age}</dd>
                </div>
                <div>
                  <dt>파트</dt>
                  <dd>{searchedUser.part}</dd>
                </div>
              </dl>
              <button
                className="secondary-button"
                type="button"
                onClick={() => navigate(`/mypage/users/${searchedUser.id}`)}
              >
                상세 페이지로 이동
              </button>
            </article>
          ) : (
            <article className="detail-card empty-result">
              <p>원하는 ID를 검색해 보세요! 🔍</p>
            </article>
          )}
        </div>
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      </section>
      <section className="list-section">
        <h2>전체 멤버 리스트</h2>
        <div className="member-grid">
          {users.map((user) => (
            <Link className="member-card" key={user.id} to={`/mypage/users/${user.id}`}>
              <span className="member-id">#{user.id}</span>
              <strong>{user.name}</strong>
              <em>{user.part}</em>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default UsersPage;
