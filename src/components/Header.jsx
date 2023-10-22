import styled from "styled-components";
import Clock from "./Clock";
import { TAB_FRIDGE, TAB_CHECKLIST } from "../constants";
import IconButton from "./IconButton";
import TabButton from "./TabButton";

const Header = ({
  isHidingZeroQuantity,
  isLocked,
  tab,
  toggleIsHidingZeroQuantity,
  toggleIsLocked,
  changeTab,
  reset,
}) => {
  return (
    <Wrapper>
      <Row>
        <Col>
          <Title>🍞 빵 얼마나 남았니</Title>
          <Clock />
        </Col>
        <Col>
          <ButtonContainer>
            <IconButton
              onClick={toggleIsHidingZeroQuantity}
              icon="fa-solid fa-eye"
              activeIcon="fa-solid fa-eye-slash"
              active={isHidingZeroQuantity}
              title="수량 0인 품목 숨기기/보이기 설정"
            />
            <IconButton
              onClick={toggleIsLocked}
              icon="fa-solid fa-lock-open"
              activeIcon="fa-solid fa-lock"
              active={isLocked}
              title="잠금/입력 모드 설정"
            />
            <IconButton
              onClick={reset}
              icon="fa-solid fa-rotate-left"
              title="초기화"
            />
          </ButtonContainer>
        </Col>
      </Row>
      <TabContainer>
        <TabButton
          text="🎂 수량 조사할 때"
          active={tab === TAB_FRIDGE}
          onClick={() => changeTab(TAB_FRIDGE)}
        />
        <TabButton
          text="📑 수량 기록할 때"
          active={tab === TAB_CHECKLIST}
          onClick={() => changeTab(TAB_CHECKLIST)}
        />
      </TabContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 3rem;
  padding: 2.4rem 2rem 1.6rem;
  background-color: var(--header-bg-color);
`;

const Col = styled.div``;

const Title = styled.h1`
  font-family: "ddangs";
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  word-break: keep-all;
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 2rem;
`;

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  box-shadow: var(--box-shadow);
`;
