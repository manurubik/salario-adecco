import { useState } from 'react';
import InputField from './InputField';
import { Accordion } from 'react-bootstrap';

interface AccordionCalcsProps {
  activeKey: string | null;
  setActiveKey: (key: string | null) => void;
}

const AccordionCalcs = ({ activeKey, setActiveKey }: AccordionCalcsProps) => {
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

    setErrorMessage('');
    const result = hours + minutes / 60;
    setDecimalHours(parseFloat(result.toFixed(3)));
  };

  const calculateTimeDifference = () => {
    if (
      isNaN(startHours) ||
      isNaN(startMinutes) ||
      isNaN(endHours) ||
      isNaN(endMinutes)
    ) {
      setDifferenceErrorMessage('Todos los campos deben estar completos.');
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

    setDifferenceErrorMessage('');

    // Convierte las horas de entrada y salida a minutos
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

  return (
    <div className="bg-gray-100 rounded-lg shadow-md">
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
          <Accordion.Body className="p-6 bg-gray-100">
            <h2 className="text-xl font-semibold text-center mb-2">
              Introduzca las horas de entrada y salida:
            </h2>
            <div className="flex flex-col gap-3 items-center">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <InputField
                    label="Hora de entrada (Horas):"
                    value={startHours}
                    onChange={setStartHours}
                    step={1}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <InputField
                    label="Minutos de entrada:"
                    value={startMinutes}
                    onChange={setStartMinutes}
                    step={1}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <InputField
                    label="Hora de salida (Horas):"
                    value={endHours}
                    onChange={setEndHours}
                    step={1}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <InputField
                    label="Minutos de salida:"
                    value={endMinutes}
                    onChange={setEndMinutes}
                    step={1}
                  />
                </div>
              </div>

              <button
                onClick={calculateTimeDifference}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Calcular
              </button>

              {differenceErrorMessage && (
                <div className="bg-red-100 p-2 rounded-md text-center text-red-700">
                  <p className="font-semibold mb-0">{differenceErrorMessage}</p>
                </div>
              )}

              {timeDifference !== null && !differenceErrorMessage && (
                <div className="bg-purple-100 border-2 border-purple-600 p-2 rounded-md text-center">
                  <p className="text-lg font-semibold mb-0">
                    Horas trabajadas: {timeDifference} horas
                  </p>
                </div>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="bg-blue-500 text-white p-1 hover:bg-blue-600 transition">
            Convertir a horas
          </Accordion.Header>
          <Accordion.Body className="p-6 bg-gray-100">
            <h2 className="text-xl font-semibold text-center mb-2">
              Introduzca el tiempo a calcular:
            </h2>
            <div className="flex flex-col gap-3 items-center">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <InputField
                    label="Horas:"
                    value={hours}
                    onChange={setHours}
                    step={1}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <InputField
                    label="Minutos:"
                    value={minutes}
                    onChange={setMinutes}
                    step={1}
                  />
                </div>
              </div>
              <p className="border-1 border-yellow-600 bg-yellow-100 rounded-lg p-2 text-center text-yellow-600">
                <strong>Nota:</strong> Si cambia los valores vuelva a hacer
                click en el botón "Convertir" para actualizar el resultado
              </p>
              <button
                onClick={convertToDecimal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Convertir
              </button>

              {errorMessage && (
                <div className="bg-red-100 p-2 rounded-md text-center text-red-700">
                  <p className="font-semibold mb-0">{errorMessage}</p>
                </div>
              )}

              {decimalHours !== null && !errorMessage && (
                <div className="bg-purple-100 border-2 border-purple-600 p-2 rounded-md text-center">
                  <p className="text-lg font-semibold mb-0">
                    {hours} horas y {minutes} minutos = {decimalHours} horas
                  </p>
                </div>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccordionCalcs;
