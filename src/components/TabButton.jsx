import styled from "styled-components";

const TabButton = ({ text, active, onClick }) => {
  return (
    <Wrapper type="button" active={active} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

export default TabButton;

const Wrapper = styled.button`
  padding: 1.5rem;
  background-color: ${({ active }) =>
    active ? "var(--active-tab-btn-color)" : "var(--tab-btn-color)"};
  font-size: 1.6rem;
  font-weight: ${({ active }) => active && "bold"};
  color: ${({ active }) => !active && "var(--sub-text-color)"};
`;
