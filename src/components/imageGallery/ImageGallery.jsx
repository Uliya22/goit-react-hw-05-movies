import PropTypes from 'prop-types';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.gallery}>
      {images &&
        images.map(({ id, tags, smallImage, largeImage }) => (
          <ImageGalleryItem
            key={id}
            description={tags}
            smallImage={smallImage}
            largeImage={largeImage}
            openModal={openModal}
          />
        ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
}

export default ImageGallery;