import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import PlaceholderImg from "../assets/images/placeholder.png";
import { BREAD_PACKING_LABELS } from "../data/bread-packing-labels";
import QuantityButton from "./QuantityButton";

const BreadItem = ({
  bread: {
    id,
    breadNo,
    name,
    quantity: initialQuantity,
    stockable,
    stockCount,
    packingLabelIndex,
  },
  isLastItem,
  isLocked,
  isHidingZeroQuantity,
  setBreadList,
}) => {
  const inputRef = useRef();
  const [quantity, setQuantity] = useState(initialQuantity);

  const packingLabelList = BREAD_PACKING_LABELS.find(
    (item) => item.breadNo === breadNo
  )?.labels;

  const packingLabel =
    packingLabelIndex === -1 ? "" : packingLabelList[packingLabelIndex];

  const onQuantityInputFocus = () => {
    if (quantity === 0) {
      inputRef.current.value = "";
    }
  };

  const onQuantityInputBlur = () => {
    if (inputRef.current.value === "") {
      inputRef.current.value = 0;
    }
  };

  const onQuantityInputChange = (e) => {
    const value = Number(e.target.value);

    setQuantity(value);
    setBreadList((breadList) =>
      breadList.map((bread) =>
        bread.id === id ? { ...bread, quantity: value } : bread
      )
    );
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    setBreadList((breadList) =>
      breadList.map((bread) =>
        bread.id === id ? { ...bread, quantity: bread.quantity + 1 } : bread
      )
    );
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => prev - 1);
    setBreadList((breadList) =>
      breadList.map((bread) =>
        bread.id === id ? { ...bread, quantity: bread.quantity - 1 } : bread
      )
    );
  };

  const addBreadStock = () => {
    if (isLocked || !stockable) return;

    const stockBread = {
      id: id.split("-")[0] + "-" + (stockCount + 1),
      name: name,
      breadNo: breadNo,
      quantity: 0,
      packingLabelIndex:
        packingLabelIndex === -1
          ? -1
          : packingLabelIndex === packingLabelList.length - 1
          ? 0
          : packingLabelIndex + 1,
      stockable: stockCount === 0 ? true : false,
      stockCount: stockCount + 1,
    };

    setBreadList((breadList) =>
      [...breadList]
        .map((bread) =>
          bread.name === name ? { ...bread, stockable: false } : bread
        )
        .concat(stockBread)
    );
  };

  const changePackingLabel = () => {
    if (isLocked || packingLabelIndex === -1) return;

    const newPackingLabelIndex =
      packingLabelIndex === packingLabelList.length - 1
        ? 0
        : packingLabelIndex + 1;

    setBreadList((breadList) =>
      breadList.map((bread) =>
        bread.id === id
          ? { ...bread, packingLabelIndex: newPackingLabelIndex }
          : bread
      )
    );
  };

  return (
    <Wrapper
      isLastItem={isLastItem}
      isHidingZeroQuantity={isHidingZeroQuantity}
      quantity={quantity}
    >
      <Img src={PlaceholderImg} alt={name} />
      <Name
        onClick={addBreadStock}
        active={!isLocked && stockable}
        stockCount={stockCount}
      >
        <strong>{stockCount !== 0 ? `(재고${stockCount}) ` : ""}</strong>
        <span>{name}</span>
      </Name>
      <PackingLabel onClick={changePackingLabel} active={!isLocked}>
        {packingLabel}
      </PackingLabel>
      <Quantity>
        <QuantityButton
          icon="minus"
          onClick={decreaseQuantity}
          hidden={isLocked}
          disabled={quantity === 0}
        />
        <Input
          type="number"
          value={quantity}
          min={0}
          ref={inputRef}
          onChange={onQuantityInputChange}
          onFocus={onQuantityInputFocus}
          onBlur={onQuantityInputBlur}
          disabled={isLocked}
        />
        <QuantityButton
          icon="plus"
          onClick={increaseQuantity}
          hidden={isLocked}
        />
      </Quantity>
    </Wrapper>
  );
};

export default React.memo(BreadItem);

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 4.5fr 1.5fr 2fr;
  column-gap: 1rem;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: ${(props) =>
    props.isLastItem
      ? "1px solid var(--last-item-divider-color)"
      : "1px dashed var(--divider-color)"};
  display: ${(props) =>
    props.isHidingZeroQuantity && props.quantity === 0 && "none"};
`;

const Img = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
`;

const Name = styled.div`
  strong,
  span {
    font-size: 1.6rem;
    cursor: ${({ active }) => active && "pointer"};
  }

  ${({ stockCount }) =>
    stockCount === 1 &&
    css`
      strong {
        font-weight: bold;
      }
    `};

  ${({ stockCount }) =>
    stockCount === 2 &&
    css`
      strong {
        font-weight: bold;
        color: var(--primary-color);
      }
    `};
`;

const PackingLabel = styled.div`
  font-size: 1.4rem;
  opacity: var(--sub-text-color);
  text-align: center;
  cursor: ${({ active }) => active && "pointer"};
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 6rem;
  border: none;
  font-size: 2.2rem;
  text-align: center;
  color: ${({ disabled }) => disabled && "var(--primary-color)"};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
