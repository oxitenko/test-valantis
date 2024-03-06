import './App.css';

import { url, headers, key } from './utils';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useCallback, useState } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import Footer from './components/Footer';

const fetchIDs = async (offset, limit) => {
  try {
    const res = await axios.post(
      url,
      {
        action: 'get_ids',
        params: { offset, limit },
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

const fetchCards = async (ids) => {
  try {
    const res = await axios.post(
      url,
      {
        action: 'get_items',
        params: { ids },
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

function App() {
  const [perPage, setPerPage] = useState(1);
  const limit = 50;
  // const [uniqueCards, setUniqueCards] = useState([]);

  const findUniqueCards = (cards) => {
    return [
      ...new Map(cards?.data?.result.map((card) => [card.id, card])).values(),
    ];

    // if (uniqueCards?.length < limit) {
    //   let id;
    //   fetchIDs(uniqueCards.length, uniqueCards.length - limit).then(
    //     (res) => (id = res),
    //   );

    //   fetchCards(id).then((res) => uniqueCards.push(res?.data?.data?.result));
    // }
  };

  const calculateOffset = (perPage, limit) => {
    if (perPage > 2) {
      return (perPage - 1) * limit + 1;
    }
    return (perPage - 1) * limit;
  };

  const ids = useQuery(
    ['ids', perPage],
    () => fetchIDs(calculateOffset(perPage, limit), limit),
    {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  );

  const IDlist = ids?.data?.data?.result;

  const cards = useQuery(
    ['cards', perPage],
    () => fetchCards(ids?.data?.data?.result),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: !!IDlist,
      select: findUniqueCards,
    },
  );

  const handlePagination = (btn) => {
    if (btn === 'next') {
      setPerPage((prevState) => prevState + 1);
    } else if (btn === 'prev') {
      setPerPage((prevState) => Math.max(prevState - 1, 0));
    }
  };

  return (
    <div className="flex flex-col w-[70%] m-auto h-full">
      <Header />
      <div className="mt-7 flex justify-center items-center grow shrink-0 basis-auto">
        {cards.isLoading || ids.isLoading ? <Loader /> : null}
        {cards.isError || ids.isError ? <p>Error fetching data</p> : null}
        {cards?.data && (
          <>
            <ul className="flex flex-wrap max-w-[90%] gap-10 m-auto">
              {cards?.data.map((item) => (
                <Card key={item.id} card={item} />
              ))}
            </ul>
          </>
        )}
      </div>
      <Pagination perPage={perPage} handlePagination={handlePagination} />
      <Footer />
    </div>
  );
}

export default App;
