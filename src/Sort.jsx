import styled from "styled-components";

function Sort({ page, onPageChange }) {
  return (
    <Wrapper>
      <Item>
        <input
          type="radio"
          name="sort"
          id="fridge"
          defaultChecked={page === "fridge"}
          onClick={() => onPageChange("fridge")}
        />
        <label htmlFor="fridge">수량 확인용</label>
      </Item>
      <Item>
        <input
          type="radio"
          name="sort"
          id="checklist"
          defaultChecked={page === "checklist"}
          onClick={() => onPageChange("checklist")}
        />
        <label htmlFor="checklist">수량 기록용</label>
      </Item>
    </Wrapper>
  );
}

export default Sort;

const Wrapper = styled.div`
  display: flex;
  column-gap: 20px;
`;

const Item = styled.div`
  display: flex;
  align-content: center;

  input[type="radio"] {
    margin: 0;
    margin-right: 5px;
  }
`;
