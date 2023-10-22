import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import getItemFromLocalStorage from "./utils/getItemFromLocalStorage";
import setItemInLocalStorage from "./utils/setItemInLocalStorage";
import { BREAD_LIST } from "./data/bread-list";
import {
  CHECKLIST_BREAD_ORDER,
  FRIDGE_BREAD_ORDER,
} from "./data/bread-order-by-tab";
import {
  KEY_BREAD_TAB,
  KEY_BREAD_ISLOCKED,
  KEY_BREAD_ISHIDINGZEROQUANTITY,
  KEY_BREAD_LIST,
  TAB_FRIDGE,
} from "./constants";
import Header from "./components/Header";
import BreadItem from "./components/BreadItem";
import getItemFromLocalStroage from "./utils/getItemFromLocalStorage";

const App = () => {
  // state 초기값 설정
  const initialTab = getItemFromLocalStorage(KEY_BREAD_TAB) || TAB_FRIDGE;
  const initialIsLocked = getItemFromLocalStorage(KEY_BREAD_ISLOCKED) || false;
  const initialIsHidingZeroQuantity =
    getItemFromLocalStroage(KEY_BREAD_ISHIDINGZEROQUANTITY) || false;
  const initialBreadList =
    getItemFromLocalStorage(KEY_BREAD_LIST) || BREAD_LIST;

  // state 관리
  const [tab, setTab] = useState(initialTab);
  const [isLocked, setIsLocked] = useState(initialIsLocked);
  const [isHidingZeroQuantity, setIsHidingZeroQuantity] = useState(
    initialIsHidingZeroQuantity
  );
  const [breadList, setBreadList] = useState(initialBreadList);

  // tab에 따라 빵 목록 정렬
  const sortedBreadList =
    // '수량 조사용' 탭 -> 빵 이름(사용자 지정 목록순)에 따라 정렬
    tab === TAB_FRIDGE
      ? breadList.sort(
          (a, b) =>
            FRIDGE_BREAD_ORDER.findIndex((breadName) => breadName === a.name) -
            FRIDGE_BREAD_ORDER.findIndex((breadName) => breadName === b.name)
        )
      : // '수량 기록용' 탭 -> 빵 넘버(사용자 지정 목록순), 재고 횟수(오름차순), 빵 이름(사용자 지정 목록순)에 따라 정렬
        breadList.sort(
          (a, b) =>
            CHECKLIST_BREAD_ORDER.findIndex(
              (breadNo) => breadNo === a.breadNo
            ) -
              CHECKLIST_BREAD_ORDER.findIndex(
                (breadNo) => breadNo === b.breadNo
              ) ||
            a.stockCount - b.stockCount ||
            FRIDGE_BREAD_ORDER.findIndex((breadName) => breadName === a.name) -
              FRIDGE_BREAD_ORDER.findIndex((breadName) => breadName === b.name)
        );

  // state 변경 시 로컬스토리지에 반영
  const changeTab = (tab) => {
    setTab(tab);
    setItemInLocalStorage(KEY_BREAD_TAB, tab);
  };

  const toggleIsLocked = () => {
    setIsLocked((prev) => !prev);
    setItemInLocalStorage(KEY_BREAD_ISLOCKED, !isLocked);
  };

  const toggleIsHidingZeroQuantity = () => {
    setIsHidingZeroQuantity((prev) => !prev);
  };

  useEffect(() => {
    setItemInLocalStorage(KEY_BREAD_LIST, breadList);
  }, [breadList]);

  // 전체 초기화
  const reset = () => {
    if (window.confirm("초기화 하시겠습니까?")) {
      localStorage.removeItem(KEY_BREAD_LIST);
      localStorage.removeItem(KEY_BREAD_TAB);
      localStorage.removeItem(KEY_BREAD_ISLOCKED);
      window.location.reload();
    }
  };

  // 구분선 표시를 위해 동일 빵 제품 중 가장 마지막에 위치하는 요소 찾기
  const findLastItem = useCallback(
    (breadNo, id) => {
      if (tab === TAB_FRIDGE) return false;

      let group;

      if (isHidingZeroQuantity) {
        group = breadList.filter(
          (bread) => bread.breadNo === breadNo && bread.quantity !== 0
        );
      } else {
        group = breadList.filter((bread) => bread.breadNo === breadNo);
      }

      const isLastItem =
        group.findIndex((bread) => bread.id === id) === group.length - 1;

      return isLastItem;
    },
    [breadList, tab, isHidingZeroQuantity]
  );

  return (
    <Layout>
      <Header
        isHidingZeroQuantity={isHidingZeroQuantity}
        isLocked={isLocked}
        tab={tab}
        toggleIsHidingZeroQuantity={toggleIsHidingZeroQuantity}
        toggleIsLocked={toggleIsLocked}
        changeTab={changeTab}
        reset={reset}
      />
      <Main>
        {sortedBreadList.map((bread) => {
          return (
            <BreadItem
              key={bread.id}
              bread={bread}
              isLastItem={findLastItem(bread.breadNo, bread.id)}
              isHidingZeroQuantity={isHidingZeroQuantity}
              isLocked={isLocked}
              setBreadList={setBreadList}
            />
          );
        })}
      </Main>
    </Layout>
  );
};

export default App;

const Layout = styled.div`
  max-width: var(--breakpoint);
  min-height: 100vh;
  margin: 0 auto;
  background-color: white;
  box-shadow: var(--box-shadow);
`;

const Main = styled.main``;
