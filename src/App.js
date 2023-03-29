import { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./GloablStyle";
import { BREAD_LIST } from "./breadList";
import BreadItem from "./BreadItem";
import Clock from "./Clock";

function App() {
  const [order, setOrder] = useState("write");
  const [isLock, setIsLock] = useState(false);

  const initialBreadList =
    JSON.parse(localStorage.getItem("bread")) || BREAD_LIST;

  const [breadList, setBreadList] = useState(initialBreadList);

  useEffect(() => {
    localStorage.setItem("bread", JSON.stringify(breadList));
  }, [breadList]);

  const sortedBreadList = breadList.sort((a, b) => a[order] - b[order]);

  const onReset = () => {
    localStorage.removeItem("bread");
    window.location.reload();
  };

  return (
    <>
      <GlobalStyle />

      <Layout>
        <Header>
          <Clock />
          <Sort>
            <div>
              <input
                type="radio"
                name="sort"
                id="write"
                defaultChecked
                onClick={() => setOrder("write")}
              />
              <label htmlFor="write">기록순</label>
            </div>
            <div>
              <input
                type="radio"
                name="sort"
                id="read"
                onClick={() => setOrder("read")}
              />
              <label htmlFor="read">목록순</label>
            </div>
          </Sort>
          <Mode>
            <input
              role="switch"
              type="checkbox"
              checked={isLock}
              onChange={() => setIsLock((prev) => !prev)}
            />
            <span>{isLock ? "잠금" : "보기"}</span>
          </Mode>
          <Reset onClick={onReset}>Reset</Reset>
        </Header>

        <Main>
          {sortedBreadList.map((bread) => {
            return (
              <BreadItem
                key={bread.name}
                bread={bread}
                isLock={isLock}
                breadList={breadList}
                setBreadList={setBreadList}
              />
            );
          })}
        </Main>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: gold;
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Mode = styled.label`
  position: absolute;
  bottom: 10px;
  right: 20px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    position: relative;
    width: 60px;
    height: 30px;
    border: 1px solid tomato;
    background-color: tomato;
    border-radius: 30px;
    cursor: pointer;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    left: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: white;
    transform: scale(0.75);
    transition: left 250ms linear;
  }

  input[type="checkbox"]:checked::before {
    left: 30px;
  }

  input[type="checkbox"]:checked {
    background-color: gray;
    border-color: gray;
  }
`;

const Sort = styled.div`
  display: flex;
  column-gap: 20px;
`;

const Reset = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Main = styled.main`
  padding: 0 20px;
`;

export default App;
