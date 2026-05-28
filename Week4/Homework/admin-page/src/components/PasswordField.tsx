import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Field } from './FormField';

interface PasswordFieldProps {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
}

function PasswordField({ label, value, name, placeholder, error, onChange }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Field label={label} error={error}>
      <div className="input-with-button">
        <input
          name={name}
          type={isVisible ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
          className="icon-control"
          type="button"
          onClick={() => setIsVisible((current) => !current)}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </Field>
  );
}

export default PasswordField;
