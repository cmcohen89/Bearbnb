import { NavLink } from 'react-router-dom';
import './ComingSoon.css'

const ComingSoon = () => {
  return (
    <div className='coming-soon'>
      <h1>Feature Coming Soon!</h1>
      <h2><NavLink to='/'>Return to Main Page</NavLink></h2>
    </div>
  )
}

export default ComingSoon;
