import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getUser, updateUser } from '@/apis/users';
import ErrorMessage from '@/components/ErrorMessage';
import { InputField } from '@/components/FormField';
import Loading from '@/components/Loading';
import type { UserProfile } from '@/types/user';
import { authStorage } from '@/utils/authStorage';
import { isAgeValid, isEmailValid } from '@/utils/formValidation';

interface ProfileOutletContext {
  refreshUserName: (name: string) => void;
}

function ProfilePage() {
  const { refreshUserName } = useOutletContext<ProfileOutletContext>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailError = email && !isEmailValid(email) ? '올바른 이메일 형식으로 입력해주세요.' : '';
  const ageError = age && !isAgeValid(age) ? '나이는 1~150 사이의 숫자로 입력해주세요.' : '';
  const canSubmit =
    name.trim() !== '' && email.trim() !== '' && age.trim() !== '' && !emailError && !ageError;

  useEffect(() => {
    const fetchProfile = async () => {
      const storedUserId = authStorage.getUserId();

      if (!storedUserId) {
        setErrorMessage('로그인 정보가 없습니다.');
        setIsLoading(false);
        return;
      }

      try {
        const userData = await getUser(Number(storedUserId));
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setAge(String(userData.age));
        refreshUserName(userData.name);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : '내 정보를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProfile();
  }, [refreshUserName]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || !canSubmit) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const updatedUser = await updateUser(user.id, {
        name,
        email,
        age: Number(age),
      });

      setUser(updatedUser);
      refreshUserName(updatedUser.name);
      alert('정보 수정에 성공했습니다.');
    } catch (error) {
      const message = error instanceof Error ? error.message : '정보 수정에 실패했습니다.';
      setErrorMessage(message);
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="page-container profile-page">
      <section className="section-panel">
        <div className="section-heading">
          <span className="eyebrow">My Page</span>
          <h1>내 정보</h1>
        </div>
        {user ? (
          <>
            <dl className="info-grid">
              <div>
                <dt>아이디</dt>
                <dd>{user.loginId}</dd>
              </div>
              <div>
                <dt>파트</dt>
                <dd>{user.part}</dd>
              </div>
            </dl>
            <form className="form-stack" onSubmit={handleSubmit}>
              <InputField
                label="이름"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <InputField
                error={emailError}
                label="이메일"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <InputField
                error={ageError}
                inputMode="numeric"
                label="나이"
                name="age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
              {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
              <button className="primary-button" disabled={!canSubmit || isSubmitting} type="submit">
                {isSubmitting ? '저장 중...' : '정보 수정'}
              </button>
            </form>
          </>
        ) : (
          <ErrorMessage message={errorMessage || '내 정보를 찾을 수 없습니다.'} />
        )}
      </section>
    </main>
  );
}

export default ProfilePage;
