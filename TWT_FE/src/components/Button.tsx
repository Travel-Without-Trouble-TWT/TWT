interface ButtonProps {
  type: string;
  icon?: string;
  label: string;
}

function Button({ type, icon, label }: ButtonProps) {
  return (
    <button
      className={`flex text-sm border-2 px-2 py-1 border-lightgray rounded-md mr-2 hover:bg-lightgray transition-colors duration-300 items-center ${
        placeType === type && 'bg-lightgray'
      }`}
      onClick={() => setPlaceType(type)}
    >
      {icon}
      {label}
    </button>
  );
}

export default Button;
