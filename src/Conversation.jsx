import { FaTelegramPlane } from "react-icons/fa";
import { useState } from "react";
import profile1 from './profile1.jpg'
import profile2 from './profile2.jpg'
export default function Conversation({messages = [] , send}) {
   const [message , setMessage] = useState("")
   const sendMessage = ()=>{
      send(message)
      setMessage('')
   }
  return (
       <div className='bg-gray-100 rounded-sm shadow shadow-2xl shadow-gray-600 mess max-w-2xl w-full p-2 relative' onClick = {e => e.stopPropagation()}>
            <h1 className='text-center text-blue-500 text-2xl'>Conversation</h1>
            {
                messages.map((item , index) => <div key ={index} className={`message gap-1 my-3 mx-1 items-end flex ${item.type == 1 && 'justify-end'}`} >
                        {item.type == 2 && <img src={profile2}/>}
                        <p className={item.type == 1 ? 'bg-gray-400 ' : 'bg-blue-500'}>{item.content}</p>
                        {item.type == 1 && <img src={profile1}/>}

                </div>)
            }
            <div className='flex  items-center gap-2 px-3 send absolute max-w-2xl w-full '>
                <input type='text' value ={message}  onChange = {e =>setMessage(e.target.value)}  className='outline-none p-1 border-2 max-w-2xl w-full border-blue-400 hover:border-blue-600 rounded-sm bg-white'/>
                <FaTelegramPlane onClick = {sendMessage} color='blue' className="cursor-pointer " size='25' />
            </div>
       </div>
  )
}
