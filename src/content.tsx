import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoGetInlineAnchor } from "plasmo"
import { useState, type FC } from "react"

import aiImg from "data-base64:~../assets/ai-icon.png";
import starImg from "data-base64:~../assets/star.png";
import Modal from "~components/Modal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}


export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>{
const element = document.querySelector('.msg-form__contenteditable');
if (element && element.getAttribute('data-artdeco-is-focused') === 'true') return element;
}
  

const ShowAiIcon: FC<PlasmoCSUIProps> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
    <span onClick={()=>setOpenModal(true)} className="w-8 h-8 p-2 rounded-[50%] bg-white flex justify-center items-center cursor-pointer absolute bottom-[0.5rem] right-[5.3rem]">
    <img src={openModal ? starImg : aiImg} />
  </span>
  {openModal && <Modal setOpenModal={setOpenModal}/>}
  </>
  );
}

export default ShowAiIcon


