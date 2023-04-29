import styled from "styled-components";

function Mode({ isLock, onIsLockChange }) {
  return (
    <Wrapper>
      <span>{isLock ? "잠금" : "입력"}</span>
      <input
        role="switch"
        type="checkbox"
        checked={isLock}
        onChange={onIsLockChange}
      />
    </Wrapper>
  );
}

export default Mode;

const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    position: relative;
    width: 60px;
    height: 30px;
    margin: 0;
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

  @media screen and (max-width: 400px) {
    span {
      display: none;
    }
  }
`;
