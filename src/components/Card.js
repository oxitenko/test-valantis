import cardImage from '../images/cardImage.jpg';

const Card = ({ card }) => {
  return (
    <li className="flex flex-col max-h-[500px] w-[257px] border border-gray-100 rounded-lg shadow-md">
      <img
        className="object-contain h-full rounded-lg"
        src={cardImage}
        alt="изображение товара"
      />
      <div className="flex flex-col gap-3 p-2 h-full">
        <p className="font-semibold text-base">
          {card.brand === null ? 'Неизвестный бренд' : card.brand}
        </p>
        <p className="font-semibold text-base truncate">{card.product}</p>
        <p className="font-light text-sm">{card.price}</p>
        <p className="font-extralight text-xs truncate">{`id: ${card.id}`}</p>
      </div>
    </li>
  );
};

export default Card;
