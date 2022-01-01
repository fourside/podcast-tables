import { ClientPortal } from "./client-portal";
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
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ModalContainer = styled.div({
  width: "600px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  border: "1px solid #eee",
  borderRadius: "10px",
  padding: "24px 24px 16px 24px",
  backgroundColor: "#fff",
  position: "relative",
});

const ModalHead = styled.div({});

const CloseButton = styled.span({
  position: "absolute",
  top: "4px",
  right: "4px",
  color: "#333",
  cursor: "pointer",
  width: "24px",
  height: "24px",
  "&:hover": {
    color: "#ddd",
  },
});

const ModalBody = styled.div({
  maxHeight: "100%",
});
