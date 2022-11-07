import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Button from './button/Button';
import Modal from './modal/Modal';
import fetchImages from 'servises/apiServices';
import css from './App.module.css';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  useEffect(() => {
    if (
      searchValue &&
      page
    ) {
      setStatus('pending');
      
      fetchImages(searchValue, page)
        .then(response => {
          if (response.totalHits === 0) {
            return Promise.reject(
              new Error(`No photos with name ${searchValue}`)
            );
          }

          const images = response.hits.map(hit => ({
            id: hit.id,
            tags: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          setImages(prevState => [...prevState, ...images]);
          setStatus('resolved');
        })

        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [searchValue, page]);

  const handleSubmit = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
    setImages([]);
  };

  const onNextFetch = () => setPage(prevState => prevState + 1);

  const toggleModal = () => setShowModal(prevState => !prevState);

  const openModal = (imgUrl, alt) => {
      setShowModal((prevState) => !prevState);
      setCurrentImageUrl(imgUrl);
      setCurrentImageDescription(alt);
      };

  if (status === 'idle') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />;
        <ToastContainer autoClose={3000} />;
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />
        <h1>{error.message}</h1>
      </div>
    );
  }

  if (status === 'pending' || 'resolved') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />
        <div className={css.appContainer}>
          {status !== 'resolved' && <Loader />}
          <ImageGallery images={images} openModal={openModal} />
          {status !== 'pending' && <Button onClick={onNextFetch} />}
          {showModal && (
            <Modal
              currentImageUrl={currentImageUrl}
              currentImageDescription={currentImageDescription}
              onClose={toggleModal}
            />
          )}
          <ToastContainer autoClose={3000} />
        </div>
      </div>
    );
  }
};

export default App;