import styled from '@emotion/styled'
import { theme } from './theme'

export const ButtonBase = styled.button`
  border: 0;
  border-radius: ${theme.radius.sm};
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl};
  font-weight: ${theme.fontWeight.black};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: ${theme.opacity.disabledButton};
  }
`

export const PrimaryButton = styled(ButtonBase)`
  color: ${theme.color.white};
  background: ${theme.color.black};
  box-shadow: ${theme.shadow.lifted};
`

export const SecondaryButton = styled(ButtonBase)`
  color: ${theme.color.white};
  background: ${theme.color.black};
  box-shadow: ${theme.shadow.lifted};
`

export const DangerButton = styled(SecondaryButton)`
  min-width: ${theme.size.dangerButtonMinWidth};
`
