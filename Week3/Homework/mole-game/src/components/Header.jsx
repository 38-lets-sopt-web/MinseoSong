import { TABS } from "../constants/game";
import { AppHeader, TabButton, TabList, Title } from "../styles/layout.styles";

export function Header({ activeTab, onTabChange }) {
  return (
    <AppHeader>
      <Title>두더지 게임</Title>
      <TabList aria-label="화면 선택">
        <TabButton
          type="button"
          $active={activeTab === TABS.GAME}
          onClick={() => onTabChange(TABS.GAME)}
        >
          게임
        </TabButton>
        <TabButton
          type="button"
          $active={activeTab === TABS.RANKING}
          onClick={() => onTabChange(TABS.RANKING)}
        >
          랭킹
        </TabButton>
      </TabList>
    </AppHeader>
  );
}
