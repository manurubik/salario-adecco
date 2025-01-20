import { useState } from 'react';
import InputField from './InputField'; // Asegúrate de importar InputField

const UnitConverter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [decimalHours, setDecimalHours] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const convertToDecimal = () => {
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

  return (
    <div className="bg-gray-100 rounded-lg shadow-md">
      <button
        onClick={toggleDropdown}
        className="w-full p-4 bg-blue-500 text-white rounded-t-lg hover:bg-blue-600 transition text-center"
      >
        {isOpen
          ? 'Cerrar Conversor de Unidades'
          : 'Abrir Conversor de Unidades'}
      </button>
      {isOpen && (
        <div className="p-6 bg-gray-100">
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
                  required={true}
                  ariaRequired={true}
                />
              </div>

              <div className="flex items-center gap-2">
                <InputField
                  label="Minutos:"
                  value={minutes}
                  onChange={setMinutes}
                  step={1}
                  required={true}
                  ariaRequired={true}
                />
              </div>
            </div>
            <button
              onClick={convertToDecimal}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Convertir
            </button>

            {errorMessage && (
              <div className="bg-red-100 p-2 rounded-md text-center text-red-700">
                <p>{errorMessage}</p>
              </div>
            )}

            {decimalHours !== null && !errorMessage && (
              <div className="bg-yellow-100 p-2 rounded-md text-center">
                <p className="text-lg font-semibold">
                  Resultado: {decimalHours} horas
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
