import { useState } from "react";
import { GamePage } from "./components/GamePage";
import { Header } from "./components/Header";
import { RankingPage } from "./components/RankingPage";
import { ResultModal } from "./components/ResultModal";
import { TABS } from "./constants/game";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Page } from "./styles/layout.styles";
import { useMoleGame } from "./hooks/useMoleGame";
import { useRankings } from "./hooks/useRankings";

function App() {
  const [activeTab, setActiveTab] = useState(TABS.GAME);
  const { rankings, addRanking, clearRankings } = useRankings();
  const game = useMoleGame({ onGameFinish: addRanking });

  return (
    <>
      <GlobalStyle />
      <Page>
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === TABS.GAME ? (
          <GamePage game={game} />
        ) : (
          <RankingPage rankings={rankings} onClearRankings={clearRankings} />
        )}

        <ResultModal result={game.result} onClose={game.closeResult} />
      </Page>
    </>
  );
}

export default App;
