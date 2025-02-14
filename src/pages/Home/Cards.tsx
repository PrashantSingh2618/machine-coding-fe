import { useNavigate } from 'react-router-dom';

interface Props {
  label: string;
  link: string;
}
export default function Cards(props: Props) {
  const { label, link } = props;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };
  return (
    <div className="shadow-2xl w-full cursor-pointer " onClick={handleClick}>
      <img
        src="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg"
        className="object-cover w-50 h-50 border-4 border-cyan-500"
        alt="Dice"
      />
      <div className="p-4 text-center font-semibold bg-ehite">{label}</div>
    </div>
  );
}
