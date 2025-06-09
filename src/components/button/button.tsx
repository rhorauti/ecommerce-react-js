import { useEffect, useState } from 'react';

interface ButtonProps {
  btnColor?: string;
  btnClass?: string;
  label?: string;
  btnIsDisabled?: boolean;
  emitClickEvent?: () => void;
}

function Button(props: ButtonProps) {
  const { btnColor = 'black', btnClass = '', label = 'Fechar', btnIsDisabled = false } = props;
  const [color, setColor] = useState('');

  useEffect(() => {
    switch (btnColor) {
      case 'black': {
        setColor('bg-black hover:bg-black-500');
        break;
      }
      case 'blue': {
        setColor('bg-blue-700 hover:bg-blue-500');
        break;
      }
      case 'green': {
        setColor('bg-green-700 hover:bg-green-500');
        break;
      }
      case 'red': {
        setColor('bg-red-700 hover:bg-red-500');
        break;
      }
      case 'yellow': {
        setColor('bg-yellow-700 hover:bg-yellow-500');
        break;
      }
      case 'transparent': {
        setColor('bg-transparent hover:bg-gray-100');
        break;
      }
      default:
        'black';
    }
  }, [btnColor]);

  return (
    <button
      onClick={props.emitClickEvent}
      className={`rounded-lg p-2 font-semibold text-white disabled:bg-gray-400 ${btnClass} ${color}`}
      disabled={btnIsDisabled}
    >
      {label}
    </button>
  );
}

export default Button;
