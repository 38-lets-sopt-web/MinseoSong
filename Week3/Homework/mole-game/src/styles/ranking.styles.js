import styled from "@emotion/styled";
import { theme } from "./theme";

export const RankingPageLayout = styled.main`
  max-width: ${theme.size.contentMax};
  margin: 0 auto;
  padding: ${theme.spacing.board};
  border-radius: ${theme.radius.sm};
  background: ${theme.color.surface};
`;

export const RankingHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing.xxxl};
  margin-bottom: ${theme.spacing.section};
`;

export const RankingHint = styled.p`
  margin: ${theme.spacing.xs} 0 0;
  color: ${theme.color.grey};
`;

export const RankingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: ${theme.radius.sm};

  th,
  td {
    padding: ${theme.spacing.xxl};
    text-align: left;
  }

  th {
    color: ${theme.color.white};
    background: ${theme.color.black};
    font-size: ${theme.fontSize.sm};
  }

  td {
    color: ${theme.color.grey};
    font-weight: ${theme.fontWeight.bold};
    background: ${theme.color.surfaceSoft};
  }

  @media (max-width: ${theme.breakpoint.table}) {
    th,
    td {
      padding: ${theme.spacing.md} ${theme.spacing.xs};
      font-size: ${theme.fontSize.xs};
    }
  }
`;

export const EmptyState = styled.div`
  display: grid;
  place-items: center;
  min-height: ${theme.size.rankingEmptyHeight};
  border-radius: ${theme.radius.sm};
  color: ${theme.color.grey};
  background: ${theme.color.surface};
  font-weight: ${theme.fontWeight.extraBold};
`;
