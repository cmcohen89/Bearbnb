import { NavLink } from 'react-router-dom';
import './Footer.css'

function Footer() {

  return (
    <footer>
      <div className="footer">
        <div className='footer-left'>© 2022 Bearbnb, Inc. · Privacy · Terms · Sitemap · Destinations</div>
        <div className='footer-right'>
          <NavLink to='/coming-soon'><i className="fa-solid fa-globe globe2"></i></NavLink>
          <NavLink className='plain-link-gray' to='/coming-soon'><span>English (US)</span></NavLink>
          <NavLink className='plain-link-gray' to='/coming-soon'><span>$ USD</span></NavLink>
          <NavLink className='plain-link-gray' to='/coming-soon'><span>Support & resources</span></NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
