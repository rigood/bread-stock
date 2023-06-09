import { useEffect, useState } from "react";
import styled from "styled-components";

function Clock() {
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
      <span>{now.toLocaleDateString("en-US").slice(0, -5)}</span>

      <span>
        {" (" + now.toLocaleDateString("ko-KR", { weekday: "short" }) + ") "}
      </span>

      <span>
        {now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0")}
      </span>
    </Wrapper>
  );
}

export default Clock;

const Wrapper = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: tomato;
  text-align: center;
  line-height: 1.3;
  position: relative;
  top: 0.3rem;
`;
