import { Modal, ModalProps } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MyFileSelectionProp } from './MyFileSelection';
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

export const FileSelectorComponent: React.FC = (props: any) => {
  return <Modal {...props}></Modal>;
};
export function OpenModalSelection(
  ModalElement: React.ReactElement,
  props?: ModalProps & MyFileSelectionProp,
) {
  const div = document.createElement('div');
  const modal = createRoot(div);
  let b = true;
  const clone = React.cloneElement(ModalElement, {
    open: b,
    getContainer: false,
    onCancel: () => {
      const c = React.cloneElement(clone, { open: false } as ModalProps);
      modal.render(c);
    },
    ...props,
    onFileSelect: (fileInfo) => {
      props?.onFileSelect(fileInfo);
      const c = React.cloneElement(clone, { open: false } as ModalProps);
      modal.render(c);
    },
  } as ModalProps & MyFileSelectionProp);
  modal.render(clone);
  document.body.appendChild(div);
}
