import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '@/apis/users';
import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import type { UserProfile } from '@/types/user';

function UserDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isValidUserId = userId !== undefined && /^\d+$/.test(userId);
  const numericUserId = isValidUserId ? Number(userId) : null;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (numericUserId === null) {
        return;
      }

      try {
        const userData = await getUser(numericUserId);
        setUser(userData);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : '상세 정보를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUserDetail();
  }, [numericUserId]);

  if (numericUserId === null) {
    return (
      <main className="page-container">
        <section className="section-panel">
          <ErrorMessage message="회원 ID가 없습니다." />
        </section>
      </main>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="page-container detail-page">
      <section className="section-panel">
        <div className="section-heading">
          <h1>상세 정보</h1>
        </div>
        <button className="ghost-button" type="button" onClick={() => navigate('/mypage/users')}>
          <ArrowLeft size={16} />
          뒤로가기
        </button>
        {user ? (
          <article className="profile-detail">
            <dl className="result-info">
              <div>
                <dt>이름</dt>
                <dd>{user.name}</dd>
              </div>
              <div>
                <dt>아이디</dt>
                <dd>{user.loginId}</dd>
              </div>
              <div>
                <dt>이메일</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt>나이</dt>
                <dd>{user.age}</dd>
              </div>
              <div>
                <dt>파트</dt>
                <dd>{user.part}</dd>
              </div>
            </dl>
          </article>
        ) : (
          <ErrorMessage message={errorMessage || '상세 정보를 찾을 수 없습니다.'} />
        )}
      </section>
    </main>
  );
}

export default UserDetailPage;
