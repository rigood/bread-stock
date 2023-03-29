import { useEffect, useState } from "react";
import styled from "styled-components";

function Clock() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const Timer = setInterval(() => {
      let now = new Date();

      const date = now.toLocaleDateString("en-US").slice(0, -5);
      const day =
        "(" + now.toLocaleDateString("ko-KR", { weekday: "short" }) + ")";

      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");

      setClock(date + day + " " + hours + ":" + minutes);
    }, 1000);

    return () => {
      clearInterval(Timer);
    };
  }, []);

  return <Wrapper>{clock}</Wrapper>;
}

export default Clock;

const Wrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
