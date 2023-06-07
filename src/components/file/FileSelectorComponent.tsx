import React from "react";
import { Modal, ModalProps } from "antd";
import { createRoot } from "react-dom/client";
// import {create} from "zustand";
// type FileModalContext = {
//   open: boolean,
//   setOpen: (open: boolean) => void;
// }
// export const useContext = create<FileModalContext>((set)=>{
//   return {
//     open: false,
//     setOpen(open){
//       set((pre)=>({
//         ...pre,
//         open:open
//       }))
//     }
//   }
// })

export const FileSelectorComponent : React.FC = (props:any) => {
  return <Modal {...props}>

  </Modal>
}
 export function OpenModalSelection(ModalElement: React.ReactElement, props?: any) {
  const div = document.createElement("div")
  const modal = createRoot(div)
  let b = true
  const clone = React.cloneElement(ModalElement,{
    open: b,
    getContainer: false,
    onCancel: () => {
      const c = React.cloneElement(clone,{open: false} as ModalProps);
      modal.render(c)
    },
    ...props
  } as ModalProps,)
  modal.render(clone)
  document.body.appendChild(div)
}



