import styled, { keyframes } from "styled-components";

export const Loading: React.FC = () => {
  return (
    <Container>
      <Pulse />
    </Container>
  )
};

const Container = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const pulseAnimation = keyframes({
  "0%": {
    transform: "scale(0)",
  },
  "100%": {
    transform: "scale(1)",
    opacity: 0,
  },
});

const Pulse = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  background-color: #333;
  animation: ${pulseAnimation} 1.2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
`;
