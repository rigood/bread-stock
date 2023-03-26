import { useState } from "react";
import styled from "styled-components";

function BreadItem({ bread }) {
  const [count, setCount] = useState(0);

  const onChange = (e) => setCount(Number(e.target.value));
  const onIncrease = () => setCount((prev) => prev + 1);
  const onDecrease = () => setCount((prev) => prev - 1);

  return (
    <Wrapper>
      <Name>{bread.name}</Name>
      <Info>
        <MFD></MFD>
        <Quantity>
          <button type="button" onClick={onDecrease} disabled={count === 0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width={36}
              height={36}
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </button>
          <input type="number" value={count} onChange={onChange} />
          <button type="button" onClick={onIncrease}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width={36}
              height={36}
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </Quantity>
      </Info>
    </Wrapper>
  );
}

export default BreadItem;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid lightgray;
`;

const Name = styled.div``;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Quantity = styled.div`
  display: flex;
  input {
    width: 100px;
    text-align: center;
    font-size: 24px;
    border: none;
  }
  button {
    width: 36px;
    height: 36px;
    border: none;
    background-color: tomato;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-content: center;
  }
`;

const MFD = styled.div``;
