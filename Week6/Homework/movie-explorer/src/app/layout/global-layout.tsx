import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export default function GlobalLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

const Container = styled.main`
  width: min(100%, 1120px);
  min-height: 100svh;
  margin: 0 auto;
  padding: 56px 24px 80px;

  @media (max-width: 768px) {
    padding: 32px 16px 56px;
  }
`
