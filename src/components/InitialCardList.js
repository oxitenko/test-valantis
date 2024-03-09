import { fetchIDs, fetchCards } from '../Ruquests';
import { useQuery } from 'react-query';
import Card from './Card';
import Loader from './Loader';

const findUniqueCards = (cards) => {
  return [
    ...new Map(cards?.data?.result.map((card) => [card.id, card])).values(),
  ];
};

const InitilCardList = ({ perPage, limit }) => {
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

  return (
    <>
      {cards.isLoading || ids.isLoading ? <Loader /> : null}
      {cards?.data && (
        <>
          <ul className="flex flex-wrap gap-7">
            {cards?.data.map((item) => (
              <Card key={item.id} card={item} />
            ))}
          </ul>
        </>
      )}{' '}
    </>
  );
};

export default InitilCardList;
