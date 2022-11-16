import { NavLink } from 'react-router-dom';
import './SpotTypeBar.css'

const SpotTypeBar = () => {
  return (
    <div className='icons-div'>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/cabin.jpg' alt='cabin'></img>
        <span className='icon-label'>Cabins</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/omg.jpg' alt='omg'></img>
        <span className='icon-label'>OMG!</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/views.jpg' alt='views'></img>
        <span className='icon-label'>Amazing views</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/treehouse.jpg' alt='treehouse'></img>
        <span className='icon-label'>Treehouses</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/city.jpg' alt='city'></img>
        <span className='icon-label'>Iconic cities</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/mansion.jpg' alt='mansion'></img>
        <span className='icon-label'>Mansions</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/skiing.jpg' alt='skiing'></img>
        <span className='icon-label'>Skiing</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/countryside.jpg' alt='countryside'></img>
        <span className='icon-label'>Countryside</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/privateroom.jpg' alt='privateroom'></img>
        <span className='icon-label'>Private rooms</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/pools.jpg' alt='pools'></img>
        <span className='icon-label'>Amazing pools</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/tinyhome.jpg' alt='tinyhome'></img>
        <span className='icon-label'>Tiny homes</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/castle.jpg' alt='castle'></img>
        <span className='icon-label'>Castles</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/lakefront.jpg' alt='lakefront'></img>
        <span className='icon-label'>Lakefront</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/beach.jpg' alt='beach'></img>
        <span className='icon-label'>Beach</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/beachfront.jpg' alt='beachfront'></img>
        <span className='icon-label'>Beachfront</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/lake.jpg' alt='lake'></img>
        <span className='icon-label'>Lake</span>
      </div></NavLink>
      <NavLink to='/coming-soon'><div className='icon'>
        <img className='location-icon' src='/images/location_icons/offgrid.jpg' alt='offgrid'></img>
        <span className='icon-label'>Off-the-grid</span>
      </div></NavLink>
    </div>
  )
}

export default SpotTypeBar;
