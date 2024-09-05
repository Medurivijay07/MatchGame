import './index.css'

const Thumbnail = props => {
  const {thumbnail, thumbailClicked} = props
  const {id, thumbnailUrl, imageUrl} = thumbnail
  const onClickingThumbnail = () => {
    thumbailClicked(id)
  }
  return (
    <li className="each-thumbnail">
      <button
        type="button"
        className="thumbnai-button"
        onClick={onClickingThumbnail}
      >
        <img src={thumbnailUrl} alt="thumbnail" className="image-style" />
      </button>
    </li>
  )
}

export default Thumbnail
