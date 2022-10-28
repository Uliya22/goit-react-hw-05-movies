import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = e => {
    this.setState({ searchValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchValue.trim() === '') {
      toast.error('Введіть значення')
        return;
    }

      this.props.onSubmit(this.state.searchValue);
      this.setState({ searchValue: '' });
    };

    render() {
      return (
        <header className={css.searchbar}>
          <form className={css.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.searchButton}>
              <span className={css.buttonLabel}>Search</span>
            </button>

            <input
              className={css.searchInput}
              type="text"
              placeholder="Search images and photos"
              value={this.state.searchValue}
              onChange={this.handleChange}
            />
          </form>
        </header>
      )
    }
  };

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

export default Searchbar;