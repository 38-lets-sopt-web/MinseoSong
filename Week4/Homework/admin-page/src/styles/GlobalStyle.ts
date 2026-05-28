import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --white-color: ${({ theme }) => theme.colors.white};
    --black-color: ${({ theme }) => theme.colors.black};
    --grey-color: ${({ theme }) => theme.colors.grey};
    --background-color: ${({ theme }) => theme.colors.background};
    --pink-color: ${({ theme }) => theme.colors.pink};
    --border-color: ${({ theme }) => theme.colors.border};
    --danger-color: ${({ theme }) => theme.colors.danger};
    --shadow-light: rgba(0, 0, 0, 0.1);
    --shadow-medium: rgba(0, 0, 0, 0.2);
    --shadow-dark: rgba(0, 0, 0, 0.3);

    --text-xs: ${({ theme }) => theme.typography.xs};
    --text-sm: ${({ theme }) => theme.typography.sm};
    --text-base: ${({ theme }) => theme.typography.base};
    --text-lg: ${({ theme }) => theme.typography.lg};
    --text-xl: ${({ theme }) => theme.typography.xl};
    --text-2xl: ${({ theme }) => theme.typography.xxl};
    --text-3xl: ${({ theme }) => theme.typography.xxxl};
    --text-4xl: ${({ theme }) => theme.typography.display};

    --weight-regular: ${({ theme }) => theme.weights.regular};
    --weight-medium: ${({ theme }) => theme.weights.medium};
    --weight-semibold: ${({ theme }) => theme.weights.semibold};
    --weight-bold: ${({ theme }) => theme.weights.bold};

    --radius-xs: ${({ theme }) => theme.radius.xs};
    --radius-sm: ${({ theme }) => theme.radius.sm};
    --radius-md: ${({ theme }) => theme.radius.md};
    --radius-lg: ${({ theme }) => theme.radius.lg};
    --radius-xl: ${({ theme }) => theme.radius.xl};
    --radius-round: ${({ theme }) => theme.radius.round};

    --spacing-xxs: ${({ theme }) => theme.spacing.xxs};
    --spacing-xs: ${({ theme }) => theme.spacing.xs};
    --spacing-sm: ${({ theme }) => theme.spacing.sm};
    --spacing-md: ${({ theme }) => theme.spacing.md};
    --spacing-lg: ${({ theme }) => theme.spacing.lg};
    --spacing-xl: ${({ theme }) => theme.spacing.xl};
    --spacing-2xl: ${({ theme }) => theme.spacing.xxl};
    --spacing-3xl: ${({ theme }) => theme.spacing.xxxl};

    --container-width: 112rem;
    --header-height: 8rem;
    --input-height: 4.4rem;
    --button-height: 4.4rem;
  }
`;

export default GlobalStyle;
