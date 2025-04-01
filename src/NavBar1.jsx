import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { RiMessengerLine } from "react-icons/ri";
import Conversation from "./Conversation";
import { generateText } from "./reusableCode";
import { MdMenuOpen } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import logo1 from "./logo.jpg";
import logo2 from "./img.jpg";
import { MdOutlineDashboard } from "react-icons/md";
import amortize from './icons/amortize.png'
import audit from './icons/audit.png'
import consulting from './icons/consulting.png'
import market from './icons/marketing.png'
//******************************************** */
const menuItems = [
  {
    icons: <div><MdOutlineDashboard size={34} /></div>,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icons: <img src={audit} className="w-12 rounded-sm h-10 " />,
    label: "Audit",
    path: "/audit",
  },
  {
    icons: <img src={consulting} className="w-12 rounded-sm h-10 " />,
    label: "Consulting",
    path: "/consulting",
  },
  {
    icons: <img src={market} className="w-12 h-10 rounded-sm " />,
    label: "Marketing",
    path: "/marketing",
  },

  {
    label: "Accounting",
    path: "/accounting",
    icons: <div><FaMoneyCheckDollar size={34} /></div>,
  },
  {
    label: "Amortization",
    path: "/amortization",
    icons: <img src={amortize} className="w-12 h-10 rounded-sm " />,
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [messages, setMessages] = useState([]);
  function handleSize() {
    let width = window.innerWidth;
    if (width > 650) setOpen(true);
    else setOpen(false);
  }
  useEffect(() => {
    handleSize();
    window.onresize = () => {
      handleSize();
    };
   
  }, []);
 
  const width = open ? 240 : 64;
  const newMessage = (content, type = 1) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type,
        content,
      },
    ]);
  };
  const addMessage = async (content) => {
    newMessage(content);
    try {
      const result = await generateText(content);
      newMessage(result[0].message.content, 2);
    } catch {
      newMessage("Failed To get response", 2);
    }
  };
  return (
    <>
      {open1 && (
        <div className="modal " onClick={() => setOpen1(false)}>
          <Conversation messages={messages} send={addMessage} />
        </div>
      )}

      <div
        className="flex pb-4
    "
      >
        <nav
          className={`shadow-md h-screen fixed left-0 top-0 p-2 flex flex-col duration-500 bg-blue-600 text-white `}
          style={{ width: `${width}px` }}
        >
            <img src={open ? logo1 : logo2} alt="" className={`rounded-sm ${open ? "w-28 h-24": ""}`} />
           
          {/* Header */}
          <div className=" px-3 py-2 h-20 flex justify-between items-center">
            <RiMessengerLine
              size="25"
              className="cursor-pointer"
              onClick={() => setOpen1(true)}
            />
            <div>
              <MdMenuOpen
                size={34}
                className={` duration-500 cursor-pointer ${
                  !open && " rotate-180"
                }`}
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>

          {/* Body */}

          <ul className="flex-1">
            {menuItems.map((item, index) => {
              return (
                <Link
                  to={item.path}
                  key={index}
                  className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group"
                >
                  {item.icons}
                  <p
                    className={`${
                      !open && "w-0 translate-x-24"
                    } duration-500 overflow-hidden`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`${
                      open && "hidden"
                    } absolute left-32 shadow-md rounded-md
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}
                  >
                    {item.label}
                  </p>
                </Link>
              );
            })}
          </ul>
        </nav>
        <Outlet context={[width]} />
      </div>
    </>
  );
}
