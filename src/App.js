import { useState } from 'react';
import Header from './components/Header';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import Filters from './components/Filters';
import InitilCardList from './components/InitialCardList';
import { useQuery } from 'react-query';
import axios from 'axios';
import { url, headers } from './utils';
import FilteredCardList from './components/FilteredCardList';
import Loader from './components/Loader';

function App() {
  const [perPage, setPerPage] = useState(1);
  const limit = 50;
  const [filterOn, setFilterOn] = useState(false);
  const [filteredID, setFilteredID] = useState();

  const handlePagination = (btn) => {
    if (btn === 'next') {
      setPerPage((prevState) => prevState + 1);
    } else if (btn === 'prev') {
      setPerPage((prevState) => Math.max(prevState - 1, 0));
    }
  };

  const handleFilter = (ids) => {
    setFilteredID(ids);
  };

  const handleChangeProductList = (state) => {
    setFilterOn(state);
  };

  return (
    <>
      <Header />
      <div className="flex flex-row-reverse m-auto gap-[5%] w-[85%] min-h-calc-screen-minus-footer">
        <div className="flex flex-col w-[80%] h-full">
          <div className="mt-7 flex items-center">
            {!filterOn ? (
              <InitilCardList perPage={perPage} limit={limit} />
            ) : (
              <FilteredCardList
                filteredID={filteredID}
                perPage={perPage}
                limit={limit}
              />
            )}
          </div>
        </div>
        <Filters
          handleFilter={handleFilter}
          handleChangeProductList={handleChangeProductList}
        />
      </div>
      <Pagination perPage={perPage} handlePagination={handlePagination} />
      <Footer />
    </>
  );
}

export default App;
