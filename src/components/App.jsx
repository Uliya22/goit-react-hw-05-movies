import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Button from './button/Button';
import Modal from "./modal/Modal";
import css from './App.module.css';

class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      const URL = 'https://pixabay.com/api/';
      const KEY = '29802477-d1d969a8ee1732cb5f7983921';
      const FILTER = 'photo&orientation=horizontal&per_page=12';

      fetch(
        `${URL}?q=${this.state.searchValue}&page=${this.state.page}&key=${KEY}&image_type=${FILTER}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`No photos with name ${this.state.searchValue}`)
          );
        })

        .then(response => {
          const images = response.hits.map(hit => ({
            id: hit.id,
            tags: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            status: 'resolved',
          }));
        })
          
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSubmit = searchValue => {
    this.setState({ searchValue, page: 1, images: [] });
  }

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  }

  openModal = event => {
    const currentImageUrl = event.target.dataset.large;
    const currentImageDescription = event.target.alt;

    if (event.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  }

  render() {
    const { images, error, status, showModal, currentImageUrl, currentImageDescription } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmit} />;
          <ToastContainer autoClose={3000} />;
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmit} />;
          <Loader />;
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <Searchbar
            onSubmit={this.handleSubmit}
          />
          <div className={css.appContainer}>
            <ImageGallery
              images={images}
              openModal={this.openModal}
            />
            <Button
              onClick={this.onNextFetch}
            />
            {showModal && (
              <Modal
                currentImageUrl={currentImageUrl}
                currentImageDescription = { currentImageDescription }
                onClose = { this.toggleModal }
              />
            )}
            <ToastContainer autoClose={3000} />
          </div>
        </div>
      );
    }
  }
}

export default App;
