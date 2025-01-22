interface NotificationProps {
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
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
  const colorClasses = {
    red: 'border-red-600 bg-red-100 text-red-600',
    blue: 'border-blue-600 bg-blue-100 text-blue-600',
    green: 'border-green-600 bg-green-100 text-green-600',
    yellow: 'border-yellow-600 bg-yellow-100 text-yellow-600',
    purple: 'border-purple-600 bg-purple-100 text-purple-600',
  };

  const fontStyle = `font-${font}`;
  const textSize = `text-${text}`;

  return (
    <p
      className={`border-2 ${colorClasses[color]} rounded-lg p-2 text-center ${fontStyle} ${textSize}`}
    >
      {note && <strong>{note}: </strong>}
      {message}
    </p>
  );
};

export default Notification;
