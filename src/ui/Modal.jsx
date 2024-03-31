import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import TransitionsModal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { cloneElement, createContext, useContext, useState } from "react";
import { HiXMark } from "react-icons/hi2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vw",
  maxHeight: "85vh",
  backgroundColor: "white",
  boxShadow: 5,
  borderRadius: "15px",
  zIndex: 99999999,
};

const ModalContext = createContext();

function Modal({ children, onCloseAction }) {
  const [opens, setOpen] = useState("");
  const handleOpen = setOpen;
  const handleClose = function (e, _, options = { isSubmit: false }) {
    setOpen("");
    !options.isSubmit && onCloseAction?.();
  };

  return (
    <ModalContext.Provider value={{ opens, handleClose, handleOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { handleOpen } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => handleOpen(opens) });
}

function Window({ children, name, maxWidth = "840px", closeButton = true }) {
  const { opens, handleClose } = useContext(ModalContext);
  const windowStyle = { ...style, maxWidth };

  return (
    <TransitionsModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={opens === name}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      style={{ zIndex: 999999999 }}
    >
      <Fade style={{ zIndex: 999999999 }} in={opens === name}>
        <Box sx={windowStyle}>
          {closeButton && (
            <div className="absolute top-6 left-6">
              <button onClick={handleClose} className="text-[1.4rem]">
                <HiXMark />
              </button>
            </div>
          )}
          {cloneElement(children, { onCloseModal: handleClose })}
        </Box>
      </Fade>
    </TransitionsModal>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
