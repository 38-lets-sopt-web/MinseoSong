import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/apis/auth';
import AuthLayout from '@/components/AuthLayout';
import ErrorMessage from '@/components/ErrorMessage';
import { InputField } from '@/components/FormField';
import PasswordField from '@/components/PasswordField';
import { authStorage } from '@/utils/authStorage';

function LoginPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit = loginId.trim() !== '' && password.trim() !== '' && !isSubmitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const { userId } = await signIn({ loginId, password });
      authStorage.setUserId(userId);
      navigate('/mypage', { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="SOPT MEMBERS"
      linkTo="/signup"
      linkText="회원가입"
    >
      <form className="form-stack" onSubmit={handleSubmit}>
        <InputField
          label="아이디"
          name="loginId"
          placeholder="아이디를 입력해주세요"
          value={loginId}
          onChange={(event) => setLoginId(event.target.value)}
        />
        <PasswordField
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={setPassword}
        />
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
        <button className="primary-button" disabled={!canSubmit} type="submit">
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
