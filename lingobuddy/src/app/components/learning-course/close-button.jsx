const CloseButton = ({ onClose }) => {
  return (
    <button onClick={onClose} className="absolute top-0 right-0 p-2">
      <span aria-hidden>×</span>
    </button>
  );
};

export default CloseButton;
