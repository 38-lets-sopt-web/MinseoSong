import styled from "@emotion/styled";
import { TARGET_STATUS, TARGET_TYPES } from "../constants/game";
import { theme } from "./theme";

export const ControlPanelLayout = styled.section`
  align-self: start;
  padding: ${theme.spacing.panel};
  border-radius: ${theme.radius.sm};
  background: ${theme.color.surface};
  box-shadow: ${theme.shadow.panel};
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: ${theme.fontSize.panelTitle};
  color: ${theme.color.black};
`;

export const LevelList = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xxxl};
`;

export const LevelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  width: 100%;
  border: 0;
  border-radius: ${theme.radius.sm};
  padding: ${theme.spacing.xl};
  color: ${({ $selected }) =>
    $selected ? theme.color.black : theme.color.grey};
  background: ${({ $selected }) =>
    $selected ? theme.color.pink : theme.color.surface};
  box-shadow: ${({ $selected }) =>
    $selected ? theme.shadow.lifted : theme.shadow.tableRow};
  text-align: left;
  cursor: pointer;

  span {
    color: ${theme.color.grey};
    font-size: ${theme.fontSize.xs};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${theme.opacity.disabledLevel};
  }
`;

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.section};
`;

export const StatusBox = styled.div`
  min-height: ${theme.size.statusHeight};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.sm};
  background: ${theme.color.surfaceSoft};
  box-shadow: ${theme.shadow.tableRow};

  span {
    display: block;
    margin-bottom: ${theme.spacing.micro};
    color: ${theme.color.grey};
    font-size: ${theme.fontSize.xs};
    font-weight: ${theme.fontWeight.bold};
  }

  strong {
    font-size: ${theme.fontSize.statusValue};
    color: ${theme.color.black};
  }
`;

export const MessageBox = styled.p`
  min-height: ${theme.size.messageHeight};
  margin: ${theme.spacing.section} 0 0;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.radius.sm};
  color: ${theme.color.black};
  background: ${theme.color.pink};
  box-shadow: ${theme.shadow.lifted};
  font-weight: ${theme.fontWeight.extraBold};
`;

export const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xxxl};
`;

export const BoardArea = styled.section`
  display: grid;
  place-items: center;
  min-height: ${theme.size.boardAreaHeight};
  padding: ${theme.spacing.board};
  border-radius: ${theme.radius.sm};
  background: ${theme.background.boardArea};
  box-shadow: ${theme.shadow.panel};

  @media (max-width: ${theme.breakpoint.board}) {
    min-height: auto;
    padding: ${theme.spacing.xl};
  }
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $size }) => $size}, minmax(0, 1fr));
  gap: clamp(
    ${theme.spacing.sm},
    ${theme.viewport.boardGapFluid},
    ${theme.size.boardGapMax}
  );
  width: min(100%, ${theme.size.boardMax});
  aspect-ratio: 1;
`;

export const HoleButton = styled.button`
  position: relative;
  display: grid;
  place-items: center;
  min-width: 0;
  border: 0;
  border-radius: ${theme.radius.sm};
  background: ${theme.color.background};
  cursor: pointer;
  box-shadow: ${theme.shadow.pressed};
`;

export const HoleDepth = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 88%;
  aspect-ratio: 1 / 0.9;
  overflow: hidden;
  border-radius: ${theme.radius.circle};
  background: ${theme.background.hole};
  box-shadow: ${theme.shadow.hole};
`;

export const Target = styled.img`
  position: absolute;
  left: 50%;
  bottom: ${({ $type }) => ($type === TARGET_TYPES.BOMB ? "10%" : "2%")};
  width: ${({ $type }) => ($type === TARGET_TYPES.BOMB ? "74%" : "82%")};
  height: ${({ $type }) => ($type === TARGET_TYPES.BOMB ? "74%" : "90%")};
  object-fit: contain;
  transform: translate(-50%,
    ${({ $status }) =>
      $status === TARGET_STATUS.HIT ? theme.line.targetOffset : "0"}
  );
  transition: transform 160ms ease;
  filter: drop-shadow(0 12px 12px var(--shadow-dark));
  user-select: none;
  pointer-events: none;
`;
