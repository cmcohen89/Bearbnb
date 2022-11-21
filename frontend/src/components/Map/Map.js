import MapContainer from '../Maps';
import './Map.css';

const Map = ({ spot }) => {

  return (
    <>
      <h3 className='map-header'>Where you'll be</h3>
      <MapContainer spot={spot} />
      <p className='stat-header-item'>{spot.city}, {spot.state}, {spot.country}</p>
      <p className='spot-description'>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
        quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      </p>
    </>
  )
}

export default Map;
