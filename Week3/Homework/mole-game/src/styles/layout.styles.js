import styled from '@emotion/styled'
import { theme } from './theme'

export const Page = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing.page};
  color: ${theme.color.grey};
  background: ${theme.background.page};
`

export const AppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${theme.size.contentMax};
  margin: ${theme.spacing.none} auto ${theme.spacing.modal};
  gap: ${theme.spacing.xxxl};
`

export const Title = styled.h1`
  margin: 0;
  color: ${theme.color.black};
  font-size: ${theme.fontSize.title};
`

export const TabList = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.micro};
  border-radius: ${theme.radius.round};
  background: ${theme.color.surface};
  box-shadow: ${theme.shadow.lifted};
`

export const TabButton = styled.button`
  min-width: ${theme.size.tabMinWidth};
  border: 0;
  border-radius: ${theme.radius.round};
  padding: ${theme.spacing.sm} ${theme.spacing.section};
  color: ${({ $active }) => ($active ? theme.color.white : theme.color.grey)};
  background: ${({ $active }) => ($active ? theme.color.black : theme.color.transparent)};
  font-weight: ${theme.fontWeight.extraBold};
  cursor: pointer;
`

export const MainGrid = styled.main`
  display: grid;
  grid-template-columns: minmax(${theme.size.controlMin}, ${theme.size.controlMax}) minmax(${theme.size.boardMin}, 1fr);
  gap: ${theme.spacing.board};
  max-width: ${theme.size.contentMax};
  margin: 0 auto;

  @media (max-width: ${theme.breakpoint.main}) {
    grid-template-columns: 1fr;
  }
`
