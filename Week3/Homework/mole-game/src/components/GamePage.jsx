import { MainGrid } from "../styles/layout.styles";
import { GameBoard } from "./GameBoard";
import { GameControls } from "./GameControls";

export function GamePage({ game }) {
  return (
    <MainGrid>
      <GameControls
        selectedLevel={game.selectedLevel}
        isPlaying={game.isPlaying}
        timeLeft={game.timeLeft}
        score={game.score}
        successCount={game.successCount}
        failCount={game.failCount}
        message={game.message}
        onLevelChange={game.changeLevel}
        onStart={game.startGame}
        onStop={game.stopGame}
      />
      <GameBoard
        boardSize={game.currentLevel.size}
        cells={game.cells}
        activeTarget={game.activeTarget}
        onCellClick={game.handleCellClick}
      />
    </MainGrid>
  );
}
