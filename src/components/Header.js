import logo from '../images/logo.svg';
import { FaRegHeart } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="flex flex-col mt-[50px] justify-evenly w-[90%] m-auto">
      <div className="flex mb-8 justify-evenly">
        <div className="flex gap-2">
          <img src={logo} alt="логотип" />
          <FaRegHeart
            style={{ color: 'rgb(249 168 212)', height: '40px', width: '40px' }}
          />
        </div>

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
        <div className="flex flex-col w-[92%] m-auto gap-5">
          <p className="font-bold text-5xl text-black">Стильные украшения</p>
          <p className="font-medium text-2xl text-slate-500">
            Эффектно подчеркнут ваш образ и подойдут для любого случая
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
