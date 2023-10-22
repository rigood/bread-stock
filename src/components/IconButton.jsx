import styled from "styled-components";

const IconButton = ({
  type = "button",
  onClick,
  icon,
  activeIcon,
  active = false,
  bgColor = "transparent",
  title,
}) => {
  return (
    <Wrapper
      type={type}
      onClick={onClick}
      active={active}
      bgColor={bgColor}
      title={title}
    >
      <i className={active ? activeIcon : icon} />
    </Wrapper>
  );
};

export default IconButton;

const Wrapper = styled.button`
  background-color: ${({ bgColor }) => bgColor};

  i {
    padding: 0.4rem;
    font-size: 1.8rem;
    color: ${({ active }) => active && "var(--primary-color)"};
  }
`;
