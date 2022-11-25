import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './SearchForm.module.css';

const SearchForm =  ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => setQuery(e.currentTarget.value.toLowerCase());

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
      <header className={css.searchForm}>
        <form className={css.form} onSubmit={handleSubmitForm}>
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

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;