import { NavLink } from 'react-router-dom';
import './SpotTypeBar.css'
import { Modal } from '../../context/Modal';

const SpotTypeBar = ({ setShow404Modal }) => {
    return (
        <div className='icons-div'>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/cabin.jpg' alt='cabin'></img>
                <span className='icon-label'>Cabins</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/views.jpg' alt='views'></img>
                <span className='icon-label'>Amazing views</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/omg.jpg' alt='omg'></img>
                <span className='icon-label'>OMG!</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/treehouse.jpg' alt='treehouse'></img>
                <span className='icon-label'>Treehouses</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/city.jpg' alt='city'></img>
                <span className='icon-label'>Iconic cities</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/mansion.jpg' alt='mansion'></img>
                <span className='icon-label'>Mansions</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/skiing.jpg' alt='skiing'></img>
                <span className='icon-label'>Skiing</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/countryside.jpg' alt='countryside'></img>
                <span className='icon-label'>Countryside</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/privateroom.jpg' alt='privateroom'></img>
                <span className='icon-label'>Private rooms</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/pools.jpg' alt='pools'></img>
                <span className='icon-label'>Amazing pools</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/tinyhome.jpg' alt='tinyhome'></img>
                <span className='icon-label'>Tiny homes</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/castle.jpg' alt='castle'></img>
                <span className='icon-label'>Castles</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/lakefront.jpg' alt='lakefront'></img>
                <span className='icon-label'>Lakefront</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/beach.jpg' alt='beach'></img>
                <span className='icon-label'>Beach</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/beachfront.jpg' alt='beachfront'></img>
                <span className='icon-label'>Beachfront</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/lake.jpg' alt='lake'></img>
                <span className='icon-label'>Lake</span>
            </div></a>
            <a onClick={() => setShow404Modal(true)}><div className='icon'>
                <img className='location-icon' src='/images/location_icons/offgrid.jpg' alt='offgrid'></img>
                <span className='icon-label'>Off-the-grid</span>
            </div></a>
        </div>
    )
}

export default SpotTypeBar;
