import MapContainer from '../Maps';
import './Map.css';

const Map = ({ spot }) => {

  return (
    <MapContainer spot={spot} />
    // <>
    //   <h3 className='map-header'>Where you'll be</h3>
    //   <iframe
    //     id='map'
    //     className='embed-map'
    //     title='location-map'
    //     src={`https://www.google.com/maps/embed/v1/place?key=${environment}&q=${spot.city}+${spot.state}`}>
    //   </iframe>
    //   <p className='stat-header-item'>{spot.city}, {spot.state}, {spot.country}</p>
    //   <p className='spot-description'>
    //     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
    //     totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
    //     quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
    //   </p>
    // </>
  )
}

export default Map;
