import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './SearchBar.module.css';

const SearchBar = function ({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => setQuery(e.currentTarget.value.toLowerCase());
  console.log(query);

  const handleSubmitForm = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Введіть значення');
      return;
    }
    onSubmit(query);
    setQuery('');
    e.target.reset();
  };

  return (
    <div>
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmitForm}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            placeholder="Search movies"
            onChange={handleChange}
          />
        </form>
      </header>
    </div>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;