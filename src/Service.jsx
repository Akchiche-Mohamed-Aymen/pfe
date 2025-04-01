import { Link } from "react-router-dom";

export default function Service({service}) {
    const {image , title , description , to , btn} = service
  return (
    <div className='flex py-3 px-6 flex-col items-start md:flex-row md:items-center bg-white my-3 gap-4 shadow shadow-blue-400'>
      <img src={image} alt={title} className='h-80 w-72 rounded-sm shadow-2xl shadow-gray-500' />
      <div>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='py-5 text-gray-500 font-bold'>{description}</p>
        <Link to={to} className="bg-gray-400 block text-center w-full md:w-fit px-3 py-2 rounded-sm font-bold">{btn}</Link>
      </div>
    </div>
  )
}
