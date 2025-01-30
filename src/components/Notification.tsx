interface NotificationProps {
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  message: string;
  note?: string;
  font?: 'normal' | 'bold' | 'semibold' | 'extrabold';
  text?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

const Notification = ({
  color,
  message,
  note = '',
  font = 'normal',
  text = 'base',
}: NotificationProps) => {
  const colorClasses = `border-${color}-600 bg-${color}-100 text-${color}-600`;
  const fontStyle = `font-${font}`;
  const textSize = `text-${text}`;

  return (
    <p
      className={`border-2 ${colorClasses} rounded-lg p-2 mb-0 text-center ${fontStyle} ${textSize} align-middle`}
    >
      {note && <strong>{note}: </strong>}
      {message}
    </p>
  );
};

export default Notification;
