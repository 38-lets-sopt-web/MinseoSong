import { LEVEL_OPTIONS } from "../constants/game";
import { PrimaryButton, SecondaryButton } from "../styles/button.styles";
import {
  ActionRow,
  ControlPanelLayout,
  LevelButton,
  LevelList,
  MessageBox,
  PanelTitle,
  StatusBox,
  StatusGrid,
} from "../styles/game.styles";

export function GameControls({
  selectedLevel,
  isPlaying,
  timeLeft,
  score,
  successCount,
  failCount,
  message,
  onLevelChange,
  onStart,
  onStop,
}) {
  return (
    <ControlPanelLayout>
      <PanelTitle>레벨 선택</PanelTitle>
      <LevelList>
        {LEVEL_OPTIONS.map((level) => (
          <LevelButton
            key={level.value}
            type="button"
            disabled={isPlaying}
            $selected={selectedLevel === level.value}
            onClick={() => onLevelChange(level.value)}
          >
            <strong>{level.label}</strong>
            <span>
              {level.size} x {level.size} / {level.duration}초
            </span>
          </LevelButton>
        ))}
      </LevelList>

      <StatusGrid>
        <StatusBox>
          <span>남은 시간</span>
          <strong>{timeLeft.toFixed(1)}초</strong>
        </StatusBox>
        <StatusBox>
          <span>총 점수</span>
          <strong>{score}점</strong>
        </StatusBox>
        <StatusBox>
          <span>성공</span>
          <strong>{successCount}회</strong>
        </StatusBox>
        <StatusBox>
          <span>실패</span>
          <strong>{failCount}회</strong>
        </StatusBox>
      </StatusGrid>

      <MessageBox>{message}</MessageBox>

      <ActionRow>
        <PrimaryButton type="button" disabled={isPlaying} onClick={onStart}>
          시작
        </PrimaryButton>
        <SecondaryButton type="button" disabled={!isPlaying} onClick={onStop}>
          중단
        </SecondaryButton>
      </ActionRow>
    </ControlPanelLayout>
  );
}
