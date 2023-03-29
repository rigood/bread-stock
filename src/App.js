import { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./GloablStyle";
import { BREAD_LIST } from "./breadList";
import BreadItem from "./BreadItem";
import Clock from "./Clock";

function App() {
  const initialOrder =
    JSON.parse(localStorage.getItem("breadOrder")) || "fridge";
  const initialIsLock =
    JSON.parse(localStorage.getItem("breadIsLock")) || false;
  const initialBreadList =
    JSON.parse(localStorage.getItem("bread")) || BREAD_LIST;

  const [order, setOrder] = useState(initialOrder);
  const [isLock, setIsLock] = useState(initialIsLock);
  const [breadList, setBreadList] = useState(initialBreadList);

  const sortedBreadList = breadList.sort((a, b) => a[order] - b[order]);

  const onOrderChange = (order) => {
    setOrder(order);
    localStorage.setItem("breadOrder", JSON.stringify(order));
  };

  const onIsLockChange = () => {
    setIsLock((prev) => !prev);
    localStorage.setItem("breadIsLock", JSON.stringify(!isLock));
  };

  useEffect(() => {
    localStorage.setItem("bread", JSON.stringify(breadList));
  }, [breadList]);

  const onReset = () => {
    localStorage.removeItem("bread");
    localStorage.removeItem("breadOrder");
    localStorage.removeItem("breadIsLock");
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
                id="fridge"
                defaultChecked={order === "fridge"}
                onClick={() => onOrderChange("fridge")}
              />
              <label htmlFor="fridge">냉장고+진열대</label>
            </div>
            <div>
              <input
                type="radio"
                name="sort"
                id="checklist"
                defaultChecked={order === "checklist"}
                onClick={() => onOrderChange("checklist")}
              />
              <label htmlFor="checklist">재고대장</label>
            </div>
          </Sort>
          <Mode>
            <input
              role="switch"
              type="checkbox"
              checked={isLock}
              onChange={onIsLockChange}
            />
            <span>{isLock ? "잠금" : "입력"}</span>
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
