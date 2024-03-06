import './App.css';

import { url, headers } from './utils';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

function App() {
  const [perPage, setPerPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 50;

  const fetchIDs = async () => {
    try {
      const res = await axios.post(
        url,
        {
          action: 'get_ids',
          params: { offset: (perPage - 1) * limit, limit },
        },
        {
          headers,
        },
      );
      return res;
    } catch (error) {
      console.log(`Произошла ошибка:${error}`);
    }
  };

  const fetchCards = async (page) => {
    try {
      let filteredID;
      await fetchIDs(page).then((data) => {
        filteredID = data?.data?.result;
      });
      const res = await axios.post(
        url,
        {
          action: 'get_items',
          params: { ids: filteredID },
        },
        {
          headers,
        },
      );
      return res;
    } catch (error) {
      console.log(`Произошла ошибка:${error}`);
    }
  };

  const { data, isLoading, isError } = useQuery(
    ['cards', perPage],
    () => fetchCards(perPage),
    {
      keepPreviousData: true,
    },
  );

  const findDuplicates = (data, key) => {
    return [...new Map(data.map((item) => [key(item), item])).values()];
  };

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {data?.data?.result && (
        <div>
          <ul>
            {findDuplicates(data?.data?.result, (item) => item.id).map(
              (item) => (
                <li key={item.id}>
                  <div>
                    <p>{item.product}</p>
                    <p>{item.price}</p>
                    <p>{item.brand}</p>
                    <p>{item.id}</p>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      )}

      <button
        onClick={() => setPerPage((prevState) => Math.max(prevState - 1, 0))}
        disabled={perPage === 1}
      >
        Prev Page
      </button>
      <p>{perPage}</p>
      <button onClick={() => setPerPage((prevState) => prevState + 1)}>
        Next Page
      </button>
    </div>
  );
}

export default App;
