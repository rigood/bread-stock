import { useEffect, useState } from "react";
import styled from "styled-components";

const Clock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const clock = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  }, []);

  // 날짜 ex) 10/23
  const date = now.toLocaleDateString("en-US").slice(0, -5);

  // 요일 ex) (월)
  const weekday =
    " (" + now.toLocaleDateString("ko-KR", { weekday: "short" }) + ") ";

  // 시각 ex) 11:50
  const time =
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0");

  return (
    <Wrapper>
      <span>{date}</span>
      <span>{weekday}</span>
      <span>{time}</span>
    </Wrapper>
  );
};

export default Clock;

const Wrapper = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--clock-color);
  text-align: center;
`;
