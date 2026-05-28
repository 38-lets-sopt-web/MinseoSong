import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  linkTo: string;
  linkText: string;
  description?: string;
  eyebrow?: string;
  helperText?: string;
  pageClassName?: string;
  panelClassName?: string;
}

function AuthLayout({
  title,
  children,
  linkTo,
  linkText,
  description,
  eyebrow,
  helperText,
  pageClassName = '',
  panelClassName = '',
}: AuthLayoutProps) {
  return (
    <main className={`auth-page ${pageClassName}`}>
      <section className={`auth-panel ${panelClassName}`}>
        <div className="auth-copy">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {children}
        <div className="auth-link-row">
          {helperText ? <span>{helperText}</span> : null}
          <Link className="text-link" to={linkTo}>
            {linkText}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
