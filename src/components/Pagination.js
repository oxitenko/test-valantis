import { FaAnglesRight, FaAnglesLeft } from 'react-icons/fa6';

const Pagination = ({ perPage, handlePagination }) => {
  return (
    <div className="flex grow-0 shrink-0 basis-auto h-20 items-center justify-end">
      <button onClick={() => handlePagination('prev')} disabled={perPage === 1}>
        <FaAnglesLeft
          style={{ color: 'rgb(51 65 85)', height: '1.5em', width: '1.5em' }}
        />
      </button>
      <p className="font-medium text-lg mx-7">{perPage}</p>
      <button onClick={() => handlePagination('next')}>
        <FaAnglesRight
          style={{ color: 'rgb(51 65 85)', height: '1.5em', width: '1.5em' }}
        />
      </button>
    </div>
  );
};

export default Pagination;
