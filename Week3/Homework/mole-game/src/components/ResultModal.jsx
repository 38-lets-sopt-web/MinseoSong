import { createPortal } from "react-dom";
import { GAME_MESSAGES } from "../constants/game";
import { PrimaryButton } from "../styles/button.styles";
import {
  ModalBox,
  ModalEyebrow,
  ModalOverlay,
  ModalText,
  ModalTitle,
} from "../styles/modal.styles";

export function ResultModal({ result, onClose }) {
  if (!result) return null;

  return createPortal(
    <ModalOverlay>
      <ModalBox role="dialog" aria-modal="true" aria-labelledby="result-title">
        <ModalEyebrow>{result.isCleared ? "CLEAR" : "GAME OVER"}</ModalEyebrow>
        <ModalTitle id="result-title">최종 점수 {result.score}점</ModalTitle>
        <ModalText>
          Level {result.level} · 성공 {result.successCount}회 · 실패{" "}
          {result.failCount}회
        </ModalText>
        <ModalText>
          {result.isCleared ? GAME_MESSAGES.SAVED : GAME_MESSAGES.NOT_SAVED}
        </ModalText>
        <PrimaryButton type="button" onClick={onClose}>
          확인
        </PrimaryButton>
      </ModalBox>
    </ModalOverlay>,
    document.body,
  );
}
