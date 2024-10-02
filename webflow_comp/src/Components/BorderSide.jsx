import { Minus, Square, SquareDashedBottom, X } from 'lucide-react'
import React from 'react'

const BorderSide = () => {
  return (
    <div className='bg-na w-custom h-auto flex items-center justify-center'>
      <div className='w-auto h-full flex flex-col justify-between mr-5'>
        <div className="w-full flex justify-center items-center">
          <button className='p-1 rounded-md text-icon hover:bg-naBold hover:text-white active:bg-naBold active:text-white rotate-180'>
            <SquareDashedBottom size={15} />
          </button>
        </div>
        <div className="w-full flex justify-between items-center">
          <button className='p-1 rounded-md text-icon hover:bg-naBold hover:text-white active:bg-naBold active:text-white rotate-90'>
            <SquareDashedBottom size={15} />
          </button>
          <button className='p-1 m-1 rounded-md text-icon hover:bg-naBold hover:text-white active:bg-naBold active:text-white'>
            <Square size={15} />
          </button>
          <button className='p-1 rounded-md text-icon hover:bg-naBold hover:text-white active:bg-naBold active:text-white rotate-270'>
            <SquareDashedBottom size={15} />
          </button>
        </div>
        <div className="w-full flex justify-center items-center">
          <button className='p-1 rounded-md text-icon hover:bg-naBold hover:text-white active:bg-naBold active:text-white'>
            <SquareDashedBottom size={15} />
          </button>
        </div>
      </div>
      <div className='w-full h-full p-1 flex flex-col gap-1'>
        <div className='flex justify-between w-full items-center'>
          <p>Style</p>
          <div className='p-cpd bg-lightCs rounded-sm flex'>
            <button className='p-1 rounded-sm text-icon hover:bg-naBold hover:text-white active:bg-naBold active:text-white'>
              <X size={15} />
            </button>
            <button className='p-1 rounded-sm text-icon hover:bg-naBold hover:text-white active:bg-naBold active:text-white'>
              <Minus size={15} />
            </button>
            <button className='p-1 rounded-sm text-icon hover:bg-naBold hover:text-white active:bg-naBold active:text-white'>
              <Minus size={15} />
            </button>
            <button className='p-1 rounded-sm text-icon hover:bg-naBold hover:text-white active:bg-naBold active:text-white'>
              <Minus size={15} />
            </button>
          </div>
        </div>
        <div className='flex justify-between w-full items-center'>
          <p>Width</p>
          <input type="text" className='w-input rounded-sm bg-naBold border border-naBold focus:border-blue-700 focus:outline-none' />
        </div>
        <div className='flex justify-between w-full items-center'>
          <p>Color</p>
          <div className='w-input flex bg-naBold rounded-sm'>
            <input type="color" className='w-1/3 rounded-sm bg-naBold border border-naBold' />
            <div className='w-2/3 h-full flex items-center justify-center m-auto'>
              <p className='text-white'>
                Black
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BorderSide