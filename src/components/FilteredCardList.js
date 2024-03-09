import { useQuery } from 'react-query';
import Card from './Card';
import Loader from './Loader';
import { useCallback, useEffect, useState } from 'react';
import { fetchCards } from '../Ruquests';
import NotFind from './NotFind';

const FilteredCardList = ({ filteredID, perPage, limit }) => {
  const [filteredCards, setFilteredCards] = useState();
  const [isLoading, setIsLoading] = useState();
  const lastContentIndex = perPage * limit;
  const firstContentIndex = lastContentIndex - limit;

  const findUniqueCards = (cards) => {
    return [...new Map(cards?.map((card) => [card.id, card])).values()];
  };

  useEffect(() => {
    if (filteredID) {
      setIsLoading(true);
      fetchCards(filteredID?.data?.result)
        .then((res) => {
          const unique = findUniqueCards(res?.data?.result);
          setFilteredCards(unique);
        })
        .finally(() => setIsLoading(false));
    }
  }, [filteredID]);

  return isLoading && filteredID ? (
    <Loader />
  ) : filteredCards.length === 0 ? (
    <NotFind />
  ) : (
    <ul className="flex flex-wrap gap-7">
      {filteredCards?.slice(firstContentIndex, lastContentIndex).map((item) => (
        <Card key={item.id} card={item} />
      ))}
    </ul>
  );
};

export default FilteredCardList;
