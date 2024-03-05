import React, { useEffect, useRef, useState } from 'react'
import triangleImg from "data-base64:~../assets/triangle.png";
import refreshImg from "data-base64:~../assets/refresh.png";
import downArrowImg from "data-base64:~../assets/down-arrow.png";


interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setOpenModal }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [prompts, setPrompts] = useState<string[]>([]);
  const answer = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollContainerToBottom();
  }, [prompts]);

  const handleGenerate = () => {
    setPrompts(prevPrompts => [...prevPrompts, inputValue]);
    setInputValue("");
  }

  const handleInsert = () => {
    setOpenModal(false);
    const element = document.querySelector('.msg-form__contenteditable');
    const placeholderElement = document.querySelector('.msg-form__placeholder');

    if (element) {
      const firstPChild = element.querySelector('p:first-child');
      if (firstPChild) {
        firstPChild.textContent = answer;
        placeholderElement.setAttribute('data-placeholder', '');
      }
    }
  }


  const scrollContainerToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  return (
    <div onClick={()=>setOpenModal(false)} className=' z-[121] w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex justify-center items-center'>
      <button disabled={false} className='z-[2147483647] bg-white rounded-[0.94rem] flex flex-col gap-8 w-[80%] sm:w-1/2 md:w-1/3 '>
        <div className='max-h-96 flex flex-col gap-8 overflow-y-auto' ref={containerRef}>
          {prompts?.map((prompt) => (
            <>
              {prompt && <div className='flex justify-end p-8'>
                <div className='max-w-[80%] bg-[#DFE1E7] rounded-lg px-4 py-2 break-words text-wrap'>
                  <p>{prompt}</p>
                </div>
              </div>}
              <div className='flex p-8'>
                <div className='max-w-[80%] bg-[#DBEAFE] rounded-lg px-4 py-2 break-words text-wrap'>
                  <p>{answer}</p>
                </div>
              </div>
            </>
          ))}
        </div>

        <div className='flex flex-col gap-8 p-4'>
          <div><input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Your prompt' className='p-2 border border-gray-300 rounded-md focus:border-none focus:outline-[#3B82F6] w-full' /></div>
          <div className='flex justify-end items-center gap-8'>
            {prompts.length === 0 ? <button disabled={!inputValue} onClick={handleGenerate} className='bg-[#3B82F6] px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2'>
              <img src={triangleImg} width={"16px"} height={"16px"} /> <p>Generate</p>
            </button> : <>
              <button onClick={handleInsert} className='border-[1px] border-secondary px-4 py-2 rounded-lg text-secondary font-semibold flex items-center gap-2'>
                <img src={downArrowImg} width={"12px"} height={"12px"} /> <p>Insert</p>
              </button>
              <button onClick={handleGenerate} className='bg-[#3B82F6] px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2'>
                <img src={refreshImg} width={"14px"} height={"14px"} /> <p>Regenerate</p>
              </button>
            </>}
          </div>
        </div>
      </button>
    </div>
  )
}

export default Modal