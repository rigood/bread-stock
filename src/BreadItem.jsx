import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BREAD_LIST_CHECKLIST, BREAD_LIST_FRIDGE } from "./data";

function BreadItem({
  bread: {
    name,
    no,
    quantity,
    label: initialLabel,
    canCopy: initialCanCopy,
    img,
  },
  isLock,
  isHideZero,
  breadList,
  setBreadList,
  tab,
}) {
  const inputRef = useRef();
  const [label, setLabel] = useState(initialLabel);
  const [count, setCount] = useState(quantity);
  const [canCopy, setCanCopy] = useState(initialCanCopy);

  const onChange = (e) => {
    setCount(Number(e.target.value));
  };

  const onFocus = () => {
    if (count === 0) {
      inputRef.current.value = "";
    }
  };

  const onBlur = () => {
    if (inputRef.current.value === "") {
      inputRef.current.value = 0;
      setCount(0);
    }
  };

  const onIncrease = () => {
    setCount((prev) => prev + 1);
  };

  const onDecrease = () => {
    setCount((prev) => prev - 1);
  };

  useEffect(() => {
    const newBreadList = breadList.map((bread) => ({
      ...bread,
      quantity: bread.name === name ? count : bread.quantity,
    }));
    setBreadList(newBreadList);
  }, [count]);

  const onNameClick = () => {
    if (!canCopy || isLock) return;

    if (name.split("(재고)").length > 2) return;

    function isOriginalBread(element) {
      if (name.includes(element.name)) {
        return true;
      }
    }

    const originalBread = breadList.find(isOriginalBread);

    let newBreadList = breadList
      .concat({
        name: name + "(재고)",
        fridge: BREAD_LIST_FRIDGE.findIndex(
          (b) => b === name.replace(/\(재고\)/g, "")
        ),
        checklist: BREAD_LIST_CHECKLIST.findIndex(
          (b) => b === name.replace(/\(재고\)/g, "")
        ),
        quantity: 0,
        label: originalBread.label,
        no: originalBread.no,
        canCopy: true,
        img: `${name.replace(/\(재고\)/g, "")}.jpg`,
      })
      .map((bread) => ({
        ...bread,
        canCopy: bread.name === name ? !canCopy : bread.canCopy,
      }));

    setCanCopy(false);
    setBreadList(newBreadList);
  };

  const onLabelClick = () => {
    if (isLock) return;

    let newLabel;
    switch (true) {
      case name.includes("약밤"):
        newLabel = label === "White" ? "Opera" : "White";
        break;
      case name.includes("쇼콜라"):
        newLabel = label === "왼쪽" ? "오른쪽" : "왼쪽";
        break;
      case name.includes("미니머핀"):
        newLabel = label === "정방향" ? "역방향" : "정방향";
        break;
      default:
        return;
    }

    const newBreadList = breadList.map((bread) => ({
      ...bread,
      label: bread.name === name ? newLabel : bread.label,
    }));

    setLabel(newLabel);
    setBreadList(newBreadList);
  };

  const isLastItem = getIsLastItem();

  function getIsLastItem() {
    if (tab === "fridge") return false;

    let group;
    if (isHideZero) {
      group = breadList.filter(
        (bread) => bread.no === no && bread.quantity !== 0
      );
    } else {
      group = breadList.filter((bread) => bread.no === no);
    }

    const order = group.findIndex((bread) => bread.name === name);
    const length = group.length;

    if (order === length - 1) return true;
    else return false;
  }

  return (
    <Wrapper isLastItem={isLastItem} isHideZero={isHideZero} count={count}>
      <Img src={process.env.PUBLIC_URL + `/assets/img/${img}`} />
      <Name onClick={onNameClick}>
        <span> {name}</span>
      </Name>
      <Label onClick={onLabelClick}>{label}</Label>
      <Quantity>
        <Button
          type="button"
          onClick={onDecrease}
          isLock={isLock}
          disabled={count === 0}
        >
          <i className="fa-solid fa-minus" />
        </Button>
        <Input
          type="number"
          value={count}
          min={0}
          ref={inputRef}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={isLock ? "red" : undefined}
          disabled={isLock}
        />
        <Button type="button" onClick={onIncrease} isLock={isLock}>
          <i className="fa-solid fa-plus" />
        </Button>
      </Quantity>
    </Wrapper>
  );
}

export default BreadItem;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 4.5fr 1.5fr 2fr;
  column-gap: 1rem;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: ${(props) =>
    props.isLastItem ? "1px solid gold" : "1px dashed #ededed"};
  display: ${(props) => props.isHideZero && props.count === 0 && "none"};
`;

const Img = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
`;

const Name = styled.div`
  span {
    font-size: 1.6rem;
    cursor: pointer;
  }
`;

const Label = styled.div`
  font-size: 1.4rem;
  color: gray;
  text-align: center;
  cursor: pointer;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  padding: 0;
  border: none;
  background-color: tomato;
  border-radius: 50%;
  visibility: ${({ isLock }) => isLock && "hidden"};
  cursor: pointer;

  i {
    font-size: 2rem;
    color: white;
  }

  &:disabled {
    opacity: 0.3;
    z-index: -1;
  }
`;

const Input = styled.input`
  width: 6rem;
  border: none;
  font-size: 2.2rem;
  text-align: center;

  &.red {
    color: tomato;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
