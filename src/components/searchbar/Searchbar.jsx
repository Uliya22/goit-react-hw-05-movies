import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

const Searchbar = ({onSubmit}) => { 
  const [searchValue, setSearchValue] = useState('');
  
  const handleChange = (e) => {
    setSearchValue (e.currentTarget.value.toLowerCase());
  };

const handleSubmit = (e) => {
  e.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Введіть значення')
      return;
  }
  onSubmit (searchValue);
  setSearchValue('');
  }

   return (
        <header className={css.searchbar}>
         <form className={css.searchForm} onSubmit={handleSubmit}>
           <button type="submit" className={css.searchButton}>
           <span className={css.buttonLabel}>Search</span>
         </button>

         <input
              className={css.searchInput}
              type="text"
              placeholder="Search images and photos"
              value={searchValue}
           onChange={handleChange}
            />
          </form>
        </header>
      )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
 
export default Searchbar;