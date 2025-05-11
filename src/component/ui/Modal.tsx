import {Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode} from "react";

interface IModel {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}
export default function Modal({ title, children, isOpen,close}: IModel) {



  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center  p-4">
            <DialogPanel
              transition
              className="w-full max-w-sm rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className=" font-medium text-black  text-2xl"
              >
                {title}
              </DialogTitle>

              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
