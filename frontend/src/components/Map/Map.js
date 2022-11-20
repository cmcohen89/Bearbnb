import './Map.css';

const Map = ({ spot }) => {

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${spot.city},${spot.state}&zoom=13&size=600x400&markers=${spot.city},${spot.state}}&key=AIzaSyDwvmLYxp4CdobfLdQet-7TTiXPc0PEOQA`

  return (
    <>
      <h3 className='map-header'>Where you'll be</h3>
      <img id='map' src={mapUrl}></img>
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
