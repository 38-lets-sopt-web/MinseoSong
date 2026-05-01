import { DangerButton } from "../styles/button.styles";
import { PanelTitle } from "../styles/game.styles";
import {
  EmptyState,
  RankingHeader,
  RankingHint,
  RankingPageLayout,
  RankingTable,
} from "../styles/ranking.styles";

export function RankingPage({ rankings, onClearRankings }) {
  return (
    <RankingPageLayout>
      <RankingHeader>
        <div>
          <PanelTitle>랭킹 보드</PanelTitle>
          <RankingHint>
            레벨 내림차순, 같은 레벨에서는 점수 내림차순으로 정렬돼요.
          </RankingHint>
        </div>
        <DangerButton
          type="button"
          onClick={onClearRankings}
          disabled={rankings.length === 0}
        >
          초기화
        </DangerButton>
      </RankingHeader>

      {rankings.length > 0 ? (
        <RankingTable>
          <thead>
            <tr>
              <th>순위</th>
              <th>레벨</th>
              <th>점수</th>
              <th>성공 시간</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking, index) => (
              <tr
                key={`${ranking.level}-${ranking.score}-${ranking.successTime}-${index}`}
              >
                <td>{index + 1}</td>
                <td>Level {ranking.level}</td>
                <td>{ranking.score}점</td>
                <td>{ranking.successTime}</td>
              </tr>
            ))}
          </tbody>
        </RankingTable>
      ) : (
        <EmptyState>아직 저장된 클리어 기록이 없어요.</EmptyState>
      )}
    </RankingPageLayout>
  );
}
