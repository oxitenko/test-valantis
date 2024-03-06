import logo from '../images/logo.svg';

const Header = () => {
  return (
    <div className="flex flex-col mt-7">
      <div className="flex mb-8 justyfi-between">
        <img src={logo} alt="логотип" />
        <div className="flex gap-10 justify-center w-3/4">
          <a className="text-stone-500 text-3xl font-medium" href="#">
            каталог
          </a>
          <a className="text-stone-500 text-3xl font-medium" href="#">
            оплата и доставка
          </a>
          <a className="text-stone-500 text-3xl font-medium" href="#">
            контакты
          </a>
        </div>
      </div>
      <div className="banner">
        <p className="font-bold text-5xl text-black">Стильные украшения</p>
        <p className="font-medium text-2xl text-slate-500">
          Эффектно подчеркнут ваш образ и подойдут для любого случая
        </p>
      </div>
    </div>
  );
};

export default Header;
