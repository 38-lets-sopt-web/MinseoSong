import { TARGET_STATUS, TARGET_TYPES } from "../constants/game";
import bombImage from "../assets/bomb.png";
import moleHitImage from "../assets/mole-hit.png";
import moleNormalImage from "../assets/mole-normal.png";
import {
  Board,
  BoardArea,
  HoleButton,
  HoleDepth,
  Target,
} from "../styles/game.styles";

const getTargetLabel = (target) => {
  if (!target) return "빈 구멍";
  if (target.type === TARGET_TYPES.BOMB) return "폭탄";
  return target.status === TARGET_STATUS.HIT ? "잡힌 두더지" : "두더지";
};

const getTargetImage = (target) => {
  if (target.type === TARGET_TYPES.BOMB) return bombImage;
  return target.status === TARGET_STATUS.HIT ? moleHitImage : moleNormalImage;
};

export function GameBoard({ boardSize, cells, activeTarget, onCellClick }) {
  return (
    <BoardArea>
      <Board $size={boardSize}>
        {cells.map((index) => {
          const isActive = activeTarget?.index === index;

          return (
            <HoleButton
              key={index}
              type="button"
              aria-label={getTargetLabel(isActive ? activeTarget : null)}
              onClick={() => onCellClick(index)}
            >
              <HoleDepth>
                {isActive && (
                  <Target
                    src={getTargetImage(activeTarget)}
                    alt=""
                    $type={activeTarget.type}
                    $status={activeTarget.status}
                  />
                )}
              </HoleDepth>
            </HoleButton>
          );
        })}
      </Board>
    </BoardArea>
  );
}
