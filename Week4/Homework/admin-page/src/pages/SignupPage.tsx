import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/apis/auth';
import AuthLayout from '@/components/AuthLayout';
import ErrorMessage from '@/components/ErrorMessage';
import { InputField, SelectField } from '@/components/FormField';
import PasswordField from '@/components/PasswordField';
import { PART_OPTIONS, VALIDATION_RULES } from '@/constants/authForm';
import type { Part } from '@/types/user';
import { isAgeValid, isEmailValid } from '@/utils/formValidation';
import { getPasswordError } from '@/utils/passwordValidation';

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [part, setPart] = useState<Part>('웹');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginIdError =
    loginId.length > VALIDATION_RULES.loginIdMaxLength ? '아이디는 50자 이하로 입력해주세요.' : '';
  const passwordPolicyError = password ? getPasswordError(password) : '';
  const passwordMatchError =
    passwordConfirm && password !== passwordConfirm ? '비밀번호가 일치하지 않아요.' : '';
  const nameError =
    name.length > VALIDATION_RULES.nameMaxLength ? '이름은 10자 이하로 입력해주세요.' : '';
  const emailError = email && !isEmailValid(email) ? '올바른 이메일 형식으로 입력해주세요.' : '';
  const ageError = age && !isAgeValid(age) ? '나이는 1~150 사이의 숫자로 입력해주세요.' : '';

  const canMoveNext = useMemo(() => {
    if (step === 0) {
      return loginId.trim() !== '' && !loginIdError;
    }

    if (step === 1) {
      return (
        password.trim() !== '' &&
        passwordConfirm.trim() !== '' &&
        !passwordPolicyError &&
        !passwordMatchError
      );
    }

    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      age.trim() !== '' &&
      !nameError &&
      !emailError &&
      !ageError &&
      !isSubmitting
    );
  }, [
    age,
    ageError,
    email,
    emailError,
    isSubmitting,
    loginId,
    loginIdError,
    name,
    nameError,
    password,
    passwordConfirm,
    passwordMatchError,
    passwordPolicyError,
    step,
  ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canMoveNext) {
      return;
    }

    if (step < 2) {
      setStep((currentStep) => currentStep + 1);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      await signUp({
        loginId,
        password,
        name,
        email,
        age: Number(age),
        part,
      });

      alert(`${name}님, 회원가입에 성공했습니다.`);
      navigate('/', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : '회원가입에 실패했습니다.';
      setErrorMessage(message);
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="회원가입"
      helperText="이미 계정이 있나요?"
      linkTo="/"
      linkText="로그인"
      pageClassName="signup-page"
      panelClassName={`signup-panel signup-step-${step}`}
    >
      <form className={`form-stack signup-form signup-form-step-${step}`} onSubmit={handleSubmit}>
        {step === 0 ? (
          <InputField
            error={loginIdError}
            label="아이디"
            maxLength={VALIDATION_RULES.loginIdMaxLength + 1}
            name="loginId"
            placeholder="50자 이하로 입력해주세요"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
          />
        ) : null}
        {step === 1 ? (
          <>
            <PasswordField
              label="비밀번호"
              name="password"
              placeholder="영어, 숫자, 특수문자 포함 8~64자"
              value={password}
              onChange={setPassword}
            />
            <PasswordField
              label="비밀번호 확인"
              name="passwordConfirm"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              value={passwordConfirm}
              onChange={setPasswordConfirm}
            />
          </>
        ) : null}
        {step === 2 ? (
          <>
            <InputField
              error={nameError}
              label="이름"
              name="name"
              placeholder="10자 이하로 입력해주세요"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <InputField
              error={emailError}
              label="이메일"
              name="email"
              placeholder="sopt@sopt.org"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputField
              error={ageError}
              inputMode="numeric"
              label="나이"
              name="age"
              placeholder="숫자로 입력해주세요"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
            <SelectField
              label="파트"
              name="part"
              value={part}
              onChange={(event) => setPart(event.target.value as Part)}
            >
              {PART_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectField>
          </>
        ) : null}
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
        {step === 1 && (passwordPolicyError || passwordMatchError) ? (
          <strong className="field-error signup-step-error">
            {passwordPolicyError || passwordMatchError}
          </strong>
        ) : null}
        <div className="button-row">
          <button className="primary-button" disabled={!canMoveNext} type="submit">
            {step === 2 ? (isSubmitting ? '가입 중...' : '회원가입') : '다음'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default SignupPage;
