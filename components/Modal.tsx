import React, { useRef } from "react";

import { useClickAway, useLockBodyScroll } from "react-use";

import Portal from "./Portal";

export interface ModalProps {
  onDismiss: () => void;
}

const Modal = (props: any) => {
  const { onDismiss, children } = props;

  const ref = useRef(null);

  useClickAway(ref, onDismiss);

  //   useLockBodyScroll();

  return (
    <Portal>
      <div className="fixed overlay-bg top-0 left-0 right-0 bottom-0 z-30" />
      <div className="absolute top-0 left-0 right-0 bottom-0 pt-10 z-40">
        <div ref={ref} className="container mx-auto px-0">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
