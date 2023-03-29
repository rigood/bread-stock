import { useEffect, useState } from "react";
import styled from "styled-components";

function Clock() {
  let now = new Date();

  const date = now.toLocaleDateString("en-US").slice(0, -5);
  const day = "(" + now.toLocaleDateString("ko-KR", { weekday: "short" }) + ")";

  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const clockText = date + day + " " + hours + ":" + minutes + ":" + seconds;

  const [clock, setClock] = useState(clockText);

  useEffect(() => {
    const Timer = setInterval(() => setClock(clockText), 1000);

    return () => {
      clearInterval(Timer);
    };
  }, [clockText]);

  return <Wrapper>{clock}</Wrapper>;
}

export default Clock;

const Wrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
