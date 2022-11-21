import './ImageModal.css'

const ImageModal = ({ data, setShowImageModal }) => {
  return (
    <div>
      <div className='top-bar-img'>
        <button className="x-img" onClick={() => setShowImageModal(false)}><i className="fa-solid fa-xmark"></i></button>
      </div>
      <img className='img-modal' src={data}></img>
    </div>
  )
}

export default ImageModal;
