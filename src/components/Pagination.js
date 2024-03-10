import { FaAnglesRight, FaAnglesLeft } from 'react-icons/fa6';
const defoltButton = {
  color: 'rgb(51 65 85)',
  height: '1.5em',
  width: '1.5em',
};
const disabledButton = {
  color: 'rgb(203 213 225)',
  height: '1.5em',
  width: '1.5em',
};

const Pagination = ({ perPage, handlePagination, filteredID }) => {
  return (
    <div className="flex h-20 items-center justify-end w-[85%] m-auto">
      <button onClick={() => handlePagination('prev')} disabled={perPage === 1}>
        <FaAnglesLeft style={perPage === 1 ? disabledButton : defoltButton} />
      </button>
      <p className="font-medium text-lg mx-7">{perPage}</p>
      <button
        onClick={() => handlePagination('next')}
        disabled={filteredID?.data?.result?.length <= 50}
      >
        <FaAnglesRight
          style={
            filteredID?.data?.result?.length <= 50
              ? disabledButton
              : defoltButton
          }
        />
      </button>
    </div>
  );
};

export default Pagination;
