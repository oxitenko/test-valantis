import cat from '../images/error.png';

const NotFind = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col gap-5 items-center">
        <img className="w-[368px] h-[368px]" src={cat} alt="cat" />
        <p className="font-semibold text-2xl">Ничего не найдено</p>
        <p className="font-semibold text-2xl">
          Попробуйте поменять запрос или перезагрузить страницу
        </p>
      </div>
    </div>
  );
};

export default NotFind;
