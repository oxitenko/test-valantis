import { useQuery } from 'react-query';
import { product, price, brand, unknow } from '../utils';
import { useState } from 'react';
import { filter, fetchFields } from '../Ruquests';
import { AiOutlineEnter } from 'react-icons/ai';

const Filters = ({ handleFilter, handleChangeProductList }) => {
  const [selectedName, setSelectedName] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [selectedBrand, setSelectedBrand] = useState();

  const handleChangeName = (e) => {
    setSelectedName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setSelectedPrice(Number(`${e.target.value}.0`));
  };

  const handleChangeBrand = (e) => {
    if (e.target.value === unknow) {
      setSelectedBrand(null);
    } else {
      setSelectedBrand(e.target.value);
    }
  };

  const handleSubmit = (e, field, name) => {
    e.preventDefault();
    filter(field, name).then((res) => handleFilter(res));
    setSelectedName('');
    setSelectedPrice('');
    handleChangeProductList(true);
  };

  const handleSubmitBrand = () => {
    filter(brand, selectedBrand).then((res) => handleFilter(res));
    setSelectedBrand('');
    handleChangeProductList(true);
  };

  const brands = useQuery(['brands'], () => fetchFields(brand), {
    refetchOnWindowFocus: false,
  });

  const brandsList = Array.from(new Set(brands?.data?.data?.result));

  return (
    <div className="flex flex-col w-[20%] ml-5 gap-7 mt-7">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">По бренду</p>
        {brandsList.map((brand) => {
          return (
            <label
              className="text-stone-500 font-medium cursor-pointer"
              key={brand}
            >
              <input
                type="radio"
                name="sort"
                onChange={handleChangeBrand}
                value={brand || 'Неизвестный бренд'}
                className="mr-2"
              />
              {brand === null ? 'Неизвестный бренд' : brand}
            </label>
          );
        })}
        <button
          className="bg-pink-300 h-9 w-4/5 text-white rounded-xl text-sm mt-3"
          type="submit"
          onClick={handleSubmitBrand}
        >
          Найти по бренду
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold">По названию</p>
        <form
          className="relative"
          name="searchByname"
          method="post"
          onSubmit={(e) => handleSubmit(e, product, selectedName)}
        >
          <label>
            <AiOutlineEnter
              style={{
                position: 'absolute',
                bottom: '7px',
                right: '10px',
                color: 'rgb(168 162 158)',
              }}
            />
            <input
              className="border-stone-400 border-2 outline-none rounded-xl h-9 w-full pl-2.5 text-sm"
              type="text"
              name="name"
              placeholder="Введитете название"
              onChange={handleChangeName}
              value={selectedName || ''}
            />
          </label>
        </form>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold">По цене</p>
        <form
          className="relative"
          name="searchByname"
          method="post"
          onSubmit={(e) => handleSubmit(e, price, selectedPrice)}
        >
          <label>
            <AiOutlineEnter
              style={{
                position: 'absolute',
                bottom: '7px',
                right: '10px',
                color: 'rgb(168 162 158)',
              }}
            />

            <input
              className="border-stone-400 border-2 outline-none rounded-xl h-9 w-full pl-2.5 text-sm"
              type="text"
              name="price"
              placeholder="Введитете цену"
              onChange={handleChangePrice}
              value={selectedPrice || ''}
            />
          </label>
        </form>
      </div>
      <button
        className="bg-pink-300 h-9 w-4/5 text-white rounded-xl text-sm mt-3"
        type="button"
        onClick={() => handleChangeProductList(false)}
      >
        Показать всё
      </button>
    </div>
  );
};

export default Filters;
