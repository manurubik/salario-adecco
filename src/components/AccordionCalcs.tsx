import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import InputField from './InputField';
import Notification from './Notification';
import Button from './Button';

interface AccordionCalcsProps {
  activeKey: string | null;
  setActiveKey: (key: string | null) => void;
}

const AccordionCalcs = ({ activeKey, setActiveKey }: AccordionCalcsProps) => {
  const [isConverted, setIsConverted] = useState<boolean>(false);

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [decimalHours, setDecimalHours] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [startHours, setStartHours] = useState<number>(0);
  const [startMinutes, setStartMinutes] = useState<number>(0);
  const [endHours, setEndHours] = useState<number>(0);
  const [endMinutes, setEndMinutes] = useState<number>(0);
  const [timeDifference, setTimeDifference] = useState<number | null>(null);
  const [differenceErrorMessage, setDifferenceErrorMessage] =
    useState<string>('');

  const calculateTimeDifference = () => {
    if (
      isNaN(startHours) ||
      isNaN(startMinutes) ||
      isNaN(endHours) ||
      isNaN(endMinutes)
    ) {
      setDifferenceErrorMessage(
        'Los campos no pueden quedar vacíos (usa 0 si no aplica)'
      );
      return;
    }

    if (startHours < 0 || startMinutes < 0 || endHours < 0 || endMinutes < 0) {
      setDifferenceErrorMessage('Por favor, ingrese valores positivos.');
      return;
    }

    if (startMinutes >= 60 || endMinutes >= 60) {
      setDifferenceErrorMessage('Los minutos deben estar entre 0 y 59.');
      return;
    }

    if (startHours >= 24 || endHours >= 24) {
      setDifferenceErrorMessage('Las horas deben estar entre 0 y 23.');
      return;
    }

    setDifferenceErrorMessage('');

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    let differenceInMinutes: number;

    if (endTotalMinutes < startTotalMinutes) {
      differenceInMinutes = 1440 - startTotalMinutes + endTotalMinutes; // 1440 minutos en un día
    } else {
      differenceInMinutes = endTotalMinutes - startTotalMinutes;
    }

    const differenceInHours = differenceInMinutes / 60;
    setTimeDifference(parseFloat(differenceInHours.toFixed(3)));
  };

  const convertToDecimal = () => {
    if (isNaN(hours) || isNaN(minutes)) {
      setErrorMessage(
        'Los campos no pueden quedar vacíos (usa 0 si no aplica)'
      );
      return;
    }

    if (hours < 0 || minutes < 0) {
      setErrorMessage('Por favor, ingrese valores positivos.');
      return;
    }

    if (minutes >= 60) {
      setErrorMessage('Los minutos deben estar entre 0 y 59.');
      return;
    }

    setIsConverted(true);
    setErrorMessage('');
    const result = hours + minutes / 60;
    setDecimalHours(parseFloat(result.toFixed(3)));
  };

  return (
    <div className="bg-gray-100 shadow-md">
      <Accordion
        activeKey={activeKey}
        onSelect={(key: string | string[] | null | undefined) => {
          if (key === undefined || Array.isArray(key)) {
            setActiveKey(null);
          } else {
            setActiveKey(key);
          }
        }}
        flush
      >
        <Accordion.Item eventKey="1">
          <Accordion.Header className="bg-blue-500 text-white p-1 hover:bg-blue-600 transition">
            Calcular tiempo de trabajo
          </Accordion.Header>
          <Accordion.Body className="flex flex-col bg-gray-100 space-y-2">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-semibold text-center mb-0">
                Introduzca las horas de entrada y salida (formato 24h):
              </h2>
              <div className="grid grid-cols-2 gap-x-10">
                <InputField
                  label="Hora de entrada (Horas):"
                  value={startHours}
                  onChange={setStartHours}
                  step={1}
                  max={23}
                />
                <InputField
                  label="Minutos de entrada:"
                  value={startMinutes}
                  onChange={setStartMinutes}
                  step={5}
                />
                <InputField
                  label="Hora de salida (Horas):"
                  value={endHours}
                  onChange={setEndHours}
                  step={1}
                  max={23}
                />
                <InputField
                  label="Minutos de salida:"
                  value={endMinutes}
                  onChange={setEndMinutes}
                  step={5}
                />
              </div>
              <Button onClick={calculateTimeDifference} label="Calcular" />
            </div>
            <div>
              {differenceErrorMessage && (
                <Notification
                  color="red"
                  message={differenceErrorMessage}
                  note="Error"
                  font="semibold"
                />
              )}

              {timeDifference !== null && !differenceErrorMessage && (
                <Notification
                  color="purple"
                  message={`Horas trabajadas: ${Math.trunc(
                    timeDifference
                  )} horas y ${(
                    (timeDifference - Math.trunc(timeDifference)) *
                    60
                  ).toFixed(0)} minutos = ${timeDifference} horas`}
                  font="bold"
                  text="lg"
                />
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="bg-blue-500 text-white p-1 hover:bg-blue-600 transition">
            Convertir a horas
          </Accordion.Header>
          <Accordion.Body className="flex flex-col bg-gray-100 space-y-2">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-semibold text-center mb-0">
                Introduzca el tiempo a calcular:
              </h2>
              <div className="flex space-x-10 mt-0">
                <InputField
                  label="Horas:"
                  value={hours}
                  onChange={setHours}
                  step={1}
                />
                <InputField
                  label="Minutos:"
                  value={minutes}
                  onChange={setMinutes}
                  step={5}
                />
              </div>
              {isConverted && (
                <Notification
                  color="yellow"
                  message='Si cambia los valores vuelva a hacer click
                en el botón "Convertir" para actualizar el resultado'
                  note="Nota"
                />
              )}
              <Button onClick={convertToDecimal} label="Convertir" />
            </div>
            <div className="flex justify-center">
              {errorMessage && (
                <Notification
                  color="red"
                  message={errorMessage}
                  note="Error"
                  font="semibold"
                />
              )}

              {decimalHours !== null && !errorMessage && (
                <Notification
                  color="purple"
                  message={`
                  ${hours} horas y ${minutes} minutos = ${decimalHours} horas`}
                  font="bold"
                  text="lg"
                />
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccordionCalcs;
