import { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./GloablStyle";
import { BREAD_LIST } from "./data";
import BreadItem from "./BreadItem";
import Clock from "./Clock";
import Sort from "./Sort";
import Mode from "./Mode";

function App() {
  // state 초기값 설정
  const initialPage =
    JSON.parse(localStorage.getItem("bread_page")) || "fridge";
  const initialIsLock =
    JSON.parse(localStorage.getItem("bread_isLock")) || false;
  const initialBreadList =
    JSON.parse(localStorage.getItem("bread_list")) || BREAD_LIST;

  // state 관리
  const [page, setPage] = useState(initialPage);
  const [isLock, setIsLock] = useState(initialIsLock);
  const [isHideZero, setIsHideZero] = useState(false);
  const [breadList, setBreadList] = useState(initialBreadList);

  // 빵 리스트 정렬
  const sortedBreadList = breadList.sort((a, b) => a[page] - b[page]);

  // state 변경 시 로컬스토리지에 반영
  const onPageChange = (page) => {
    setPage(page);
    localStorage.setItem("bread_page", JSON.stringify(page));
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
      localStorage.removeItem("bread_page");
      localStorage.removeItem("bread_isLock");
      window.location.reload();
    }
  };

  return (
    <>
      <GlobalStyle />

      <Layout>
        <Header>
          <div>
            <Clock />
            <Mode isLock={isLock} onIsLockChange={onIsLockChange} />
          </div>
          <div>
            <Sort page={page} onPageChange={onPageChange} />
            <Buttons>
              <HideZero onClick={onHideZero}>
                수량 0 {isHideZero ? "보이기" : "숨기기"}
              </HideZero>
              <Reset onClick={onReset}>초기화</Reset>
            </Buttons>
          </div>
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
                page={page}
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
  row-gap: 20px;
  padding: 20px;
  background-color: gold;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media screen and (max-width: 500px) {
    & > div:last-child {
      flex-direction: column;
      row-gap: 10px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  column-gap: 10px;
`;

const HideZero = styled.button`
  font-family: inherit;
  font-size: inherit;
`;

const Reset = styled.button`
  font-family: inherit;
  font-size: inherit;
`;

const Main = styled.main``;
