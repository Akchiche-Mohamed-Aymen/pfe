
export default function Testimon({testimo}) {
    const {image , title , description } = testimo
  return (
    <div className='flex py-3 px-6 flex-col items-center  my-3 gap-4 ' style={{width : '350px'}}>
      <img src={image} alt={title} className='h-72 w-full  shadow-2xl shadow-gray-500 rounded-sm' />
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='py-5 text-gray-500 font-bold'>{description}</p>
      </div>
    </div>
  )
}
