import { ClientPortal } from "./ClientPortal";
import styled from "styled-components";
import { X } from "react-feather";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ClientPortal selector="#modal">
      <ModalBackdrop>
        <ModalContainer>
          <ModalHead>
            <CloseButton onClick={onClose} title="close modal">
              <X />
            </CloseButton>
          </ModalHead>
          <ModalBody>{children}</ModalBody>
        </ModalContainer>
      </ModalBackdrop>
    </ClientPortal>
  );
};

const ModalBackdrop = styled.div({
  position: "fixed",
  top: "0%",
  left: "0%",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
});

const ModalContainer = styled.div({
  border: "1px solid #eee",
  borderRadius: "10px",
  backgroundColor: "#fff",
  margin: "32px",
  padding: "32px",
  width: "600px",
  height: "600px",
  overflow: "hidden",
});

const ModalHead = styled.div({});

const CloseButton = styled.span({
  float: "right",
  margin: "-24px",
  color: "#aaa",
  cursor: "pointer",
  width: "24px",
  height: "24px",
});

const ModalBody = styled.div({});
