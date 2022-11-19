import { NavLink } from 'react-router-dom';
import './ComingSoon.css'

const ComingSoon = ({ setShow404Modal }) => {
  return (
    <div className='coming-soon'>
      <h1>Feature Coming Soon!</h1>
      <button onClick={() => setShow404Modal(false)} className='my-spots-button'>Return</button>
    </div>
  )
}

export default ComingSoon;
