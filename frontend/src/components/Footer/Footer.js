import { NavLink } from 'react-router-dom';
import './Footer.css'

function Footer({ setShow404Modal }) {

  return (
    <footer>
      <div className="footer">
        <div className='footer-left'>
          <span className='plain-link'>© 2022 Bearbnb, Inc.</span> · {" "}
          <a className='plain-link-gray' onClick={() => setShow404Modal(true)}>Privacy</a> · {" "}
          <a className='plain-link-gray' onClick={() => setShow404Modal(true)}>Terms</a> · {" "}
          <a className='plain-link-gray' onClick={() => setShow404Modal(true)}>Sitemap</a> · {" "}
          <a className='plain-link-gray' onClick={() => setShow404Modal(true)}>Destinations</a>
        </div>
        <div className='footer-right'>
          <a className='plain-link-gray' onClick={() => setShow404Modal(true)}><i className="fa-solid fa-globe globe2"></i></a>
          <a className='plain-link-gray' onClick={() => setShow404Modal(true)}><span>English (US)</span></a>
          <a className='plain-link-gray' onClick={() => setShow404Modal(true)}><span>$ USD</span></a>
          <a className='plain-link-gray' onClick={() => setShow404Modal(true)}><span>Support & resources</span></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
