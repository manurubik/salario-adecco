interface NotificationProps {
  color: string;
  message: string;
  note?: string;
  font?: string;
  text?: string;
}

const Notification = ({
  color,
  message,
  note = 'Nota',
  font = 'normal',
  text = 'md',
}: NotificationProps) => {
  return (
    <p
      className={`border-2 border-${color}-600 bg-${color}-100 rounded-lg p-2 text-center text-${color}-600 mb-0 font-${font} text-${text}`}
    >
      <strong>
        {note}
        {note ? ':' : ''}
      </strong>{' '}
      {message}
    </p>
  );
};

export default Notification;
