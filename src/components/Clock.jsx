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

  return (
    <Wrapper>
      {/* 날짜 */}
      <span>{now.toLocaleDateString("en-US").slice(0, -5)}</span>
      {/* 요일 */}
      <span>
        {" (" + now.toLocaleDateString("ko-KR", { weekday: "short" }) + ") "}
      </span>
      {/* 시간 */}
      <span>
        {now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0")}
      </span>
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
