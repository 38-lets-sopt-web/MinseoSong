import styled from '@emotion/styled'
import { theme } from './theme'

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  padding: ${theme.spacing.overlay};
  background: ${theme.shadow.dark};
`

export const ModalBox = styled.div`
  width: min(100%, ${theme.size.modalMaxWidth});
  padding: ${theme.spacing.modal};
  border-radius: ${theme.radius.sm};
  background: ${theme.color.surface};
  box-shadow: ${theme.shadow.modal};
`

export const ModalEyebrow = styled.p`
  margin: 0 0 ${theme.spacing.xs};
  color: ${theme.color.background};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.black};
  letter-spacing: 0;
`

export const ModalTitle = styled.h2`
  margin: 0 0 ${theme.spacing.md};
  color: ${theme.color.black};
  font-size: ${theme.fontSize.modalTitle};
`

export const ModalText = styled.p`
  margin: ${theme.spacing.xs} 0;
  color: ${theme.color.grey};
  font-weight: ${theme.fontWeight.bold};
`
