import styled from "styled-components";

const QuantityButton = ({ icon, onClick, hidden, disabled = false }) => {
  return (
    <Wrapper
      type="button"
      onClick={onClick}
      hidden={hidden}
      disabled={disabled}
    >
      <i className={`fa-solid fa-${icon}`} />
    </Wrapper>
  );
};

export default QuantityButton;

const Wrapper = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background-color: var(--primary-color);

  i {
    font-size: 2rem;
    color: white;
  }

  &:disabled {
    opacity: 0.3;
    z-index: -1;
  }
`;
