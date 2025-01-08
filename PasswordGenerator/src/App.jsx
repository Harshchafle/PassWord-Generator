
import { useState , useCallback , useEffect, useRef} from 'react'
import './output.css'

function App() {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setchar] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerate = useCallback( () => {
    let pass = ""
    let ind = 0;
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str += "0123456789"
    if(char) str += "!@#$%^&*(){}[]<>?/~`-_=+"

    for (let i = 1; i <= length; i++) {
      ind = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(ind)
    }
    setPassword(pass)
  },
  [length, number, char, ])

  useEffect( () => {
    passwordGenerate()
  }, [length, char, number, passwordGenerate])

  const copyToClipboard = useCallback( () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    
  }, [password])

  return (
    <>
      <h1 className='text-4xl text-center text-white'>
        Password Generator
      </h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 pb-3 pt-3 text-slate-300 bg-gray-700 border-lime-400'>
        
        <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} placeholder='Password'
          readOnly  className='w-full outline-none  px-3 py-1 text-gray-950' ref={passwordRef}>
          </input>
          <button onClick={copyToClipboard} className=' bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-e-lg pl-4 pr-4 hover:-translate hover:scale-110 hover:bg-indigo-500 duration-300'>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2 items-stretch '>

          <div className='gap-x-2'>
            <input type='range' min={6} max={20} value={length} className='cursor-pointer 'onChange={ (e) => {setLength(e.target.value)}}/>
            <label className='ml-2'>Length : {length}</label>
          </div>

          <div>
            <input type='checkbox' defaultChecked={number} onChange={ () => { setNumber((prev)=>!prev)}}/>
            <label className=''>Number</label>
          </div>

          <div>
            <input type='checkbox' defaultChecked={char} onChange={ () => { setchar((prev)=>!prev)}}/>
            <label className=''>Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
