import { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./GloablStyle";
import { BREAD_LIST } from "./data";
import BreadItem from "./BreadItem";
import Clock from "./Clock";

function App() {
  // state 초기값 설정
  const initialTab = JSON.parse(localStorage.getItem("bread_tab")) || "fridge";
  const initialIsLock =
    JSON.parse(localStorage.getItem("bread_isLock")) || false;
  const initialBreadList =
    JSON.parse(localStorage.getItem("bread_list")) || BREAD_LIST;

  // state 관리
  const [tab, setTab] = useState(initialTab);
  const [isLock, setIsLock] = useState(initialIsLock);
  const [isHideZero, setIsHideZero] = useState(false);
  const [breadList, setBreadList] = useState(initialBreadList);

  // 빵 목록 정렬
  const sortedBreadList = breadList.sort((a, b) => a[tab] - b[tab]);

  // state 변경 시 로컬스토리지에 반영
  const onTabChange = (tab) => {
    setTab(tab);
    localStorage.setItem("bread_tab", JSON.stringify(tab));
  };

  const onIsLockChange = () => {
    setIsLock((prev) => !prev);
    localStorage.setItem("bread_isLock", JSON.stringify(!isLock));
  };

  useEffect(() => {
    localStorage.setItem("bread_list", JSON.stringify(breadList));
  }, [breadList]);

  // 수량 0인 품목 숨기기
  const onHideZero = () => {
    setIsHideZero((prev) => !prev);
  };

  // 초기화
  const onReset = () => {
    if (window.confirm("초기화 하시겠습니까?")) {
      localStorage.removeItem("bread_list");
      localStorage.removeItem("bread_tab");
      localStorage.removeItem("bread_isLock");
      window.location.reload();
    }
  };

  return (
    <>
      <GlobalStyle />

      <Layout>
        <Header>
          <Top>
            <Clock />
            <Control>
              <i
                className={
                  isHideZero
                    ? "fa-solid fa-eye-slash active"
                    : "fa-solid fa-eye"
                }
                onClick={onHideZero}
                title="수량 0인 품목 숨기기/보이기 설정"
              />
              <i
                className={
                  isLock ? "fa-solid fa-lock active" : "fa-solid fa-lock-open"
                }
                onClick={onIsLockChange}
                title="잠금/입력 모드 설정"
              />
              <i
                className="fa-solid fa-rotate-left"
                onClick={onReset}
                title="초기화"
              />
            </Control>
          </Top>
          <Bottom>
            <Tab
              active={tab === "fridge"}
              onClick={() => onTabChange("fridge")}
            >
              🎂 수량 확인용
            </Tab>
            <Tab
              active={tab === "checklist"}
              onClick={() => onTabChange("checklist")}
            >
              📑 수량 기록용
            </Tab>
          </Bottom>
        </Header>

        <Main>
          {sortedBreadList.map((bread) => {
            return (
              <BreadItem
                key={bread.name}
                bread={bread}
                isLock={isLock}
                isHideZero={isHideZero}
                breadList={breadList}
                setBreadList={setBreadList}
                tab={tab}
              />
            );
          })}
        </Main>
      </Layout>
    </>
  );
}

export default App;

const Layout = styled.div`
  max-width: 500px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: white;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;
  padding: 20px;
  background-color: #ffed46;
`;

const Control = styled.div`
  display: flex;
  column-gap: 20px;
  i {
    padding: 4px;
    font-size: 18px;
    cursor: pointer;
  }
  .active {
    color: tomato;
  }
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 0px 2px 8px -4px rgba(99, 99, 99, 0.2);
`;

const Tab = styled.div`
  padding: 15px;
  background-color: ${(props) => (props.active ? "lightyellow" : "white")};
  font-weight: ${(props) => props.active && "bold"};
  color: ${(props) => !props.active && "gray"};
  text-align: center;
  cursor: pointer;
`;

const Main = styled.main``;
