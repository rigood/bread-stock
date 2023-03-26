import { useState } from "react";
import GlobalStyle from "./GloablStyle";
import styled from "styled-components";
import BreadItem from "./BreadItem";
import { BREAD_LIST } from "./breadList";

function App() {
  const [order, setOrder] = useState("write");
  const sortedBread = BREAD_LIST.sort((a, b) => a[order] - b[order]);

  const dateNow = new Date();
  const date = dateNow.toLocaleDateString("en-US").slice(0, -5);
  const day =
    "(" + dateNow.toLocaleDateString("ko-KR", { weekday: "short" }) + ")";

  return (
    <>
      <GlobalStyle />

      <Layout>
        <Header>
          <Dates>
            <span>{date}</span>
            <span>{day}</span>
          </Dates>
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
        </Header>

        <Main>
          {sortedBread.map((bread) => {
            return <BreadItem bread={bread} />;
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
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background-color: gold;
`;

const Dates = styled.div`
  font-size: 24px;
  font-weight: bold;
  span:first-child {
    margin-right: 10px;
  }
`;

const Sort = styled.div`
  display: flex;
  column-gap: 20px;
`;

const Main = styled.main`
  padding: 0 20px;
`;

export default App;
