import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  description,
  smallImage,
  largeImage,
  openModal,
}) => {
  return (
    <li className={css.galleryItem} onClick={openModal}>
      <img
        className={css.galleryItemImage}
        src={smallImage}
        alt={description}
        data-large={largeImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  description: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;