import { FunctionComponent, h, RefObject } from "preact";
import { useCallback, useRef } from "preact/hooks";

type InnerHandler = {
  /** ref of the component directly under the dialog */
  innerRef: RefObject<HTMLDivElement>;
  /** manage clicking out side of the modal */
  close: (e: MouseEvent) => void;
};

// stop closing when clicking inside of the dialog
const useInnerHandler = (onClose: () => void): InnerHandler => {
  const innerRef = useRef<HTMLDivElement>();

  const close = useCallback(
    (e: MouseEvent) => {
      const clicked = e.target as HTMLElement;

      if (innerRef.current?.contains(clicked)) {
        return;
      }

      onClose();
    },
    [onClose]
  );

  return { innerRef, close };
};

type Handler = Readonly<{
  ref: RefObject<HTMLDialogElement>;
  open: () => void;
  close: () => void;
}>;

export const useDialog = (): Handler => {
  const ref = useRef<HTMLDialogElement | null>(null);

  const open = useCallback(() => {
    ref.current?.showModal();
  }, [ref.current]);

  const close = useCallback(() => {
    ref.current?.close();
  }, [ref.current]);

  return { ref, open, close };
};

type Prop = Readonly<{
  customRef: RefObject<HTMLDialogElement>;
  onClose: () => void;
  className?: string;
  innerClassName?: string;
}>;

export const Dialog: FunctionComponent<Prop> = ({
  customRef,
  children,
  onClose,
  className,
  innerClassName,
}) => {
  const { close, innerRef } = useInnerHandler(onClose);

  return (
    <dialog ref={customRef} onClick={close} className={className}>
      <div className={innerClassName} ref={innerRef}>
        {children}
      </div>
    </dialog>
  );
};
