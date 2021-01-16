import React, { useCallback, useState, useMemo } from 'react';
import {
  FaMinus,
  FaPlus,
  FaDivide,
  FaTimes,
  FaEquals,
  FaBackspace,
} from 'react-icons/fa';

import Formula from '../../Components/Formula';

import Header from '../../Components/Header';
import RedButton from '../../Components/Buttons/RedButton';
import SmallButton from '../../Components/Buttons/SmallButton';
import BigButton from '../../Components/Buttons/BigButton';

import {
  Container,
  CalcBackground,
  Visor,
  TopPortion,
  BottomPortion,
  FirstLine,
  SimpleOperation,
  SecondLine,
} from './styles';

const Calculator: React.FC = () => {
  const formulaPi = `\\pi`;
  const formulaXExpM1 = `x^{-1}`;
  const formulaXExp2 = `x^{2}`;
  const formulaXExp3 = `x^{3}`;
  const formulaSqrtX = `\\sqrt{x}`;
  const formulaE = `e`;

  const [fstOperand, setFstOperand] = useState('0');
  const [sndOperand, setSndOperand] = useState('0');
  const [memory, setMemory] = useState('0');
  const [visorReadOnly, setVisorReadOnly] = useState(false);
  const [operationHasFinished, setOperationHasFinished] = useState(true);
  const [currentOperand, setCurrentOperand] = useState<'1st' | '2nd'>('1st');
  const [shouldShowSecond, setShouldShowSecond] = useState(false);
  const [operation, setOperation] = useState<
    'plus' | 'minus' | 'times' | 'division'
  >('plus');
  const [shouldShowOperation, setShouldShowOperation] = useState(false);
  const [shouldTurnIntoDecimal, setShouldTurnIntoDecimal] = useState(false);
  const [digitAndPointIsBlocked, setDigitAndPointIsBlocked] = useState(false);

  const integerNumberAndExponent = (
    number: string,
  ): { integer: number; exponent: number } => {
    const [integerPart, decimalPart] = number.split('.');
    const exponent = decimalPart.length;
    const wholeNumberWithoutpoint = integerPart.concat(decimalPart);
    return { integer: Number(wholeNumberWithoutpoint), exponent };
  };

  const operate = (
    operand1: string,
    operand2: string,
    operat: 'plus' | 'minus' | 'times' | 'division',
  ): { result: number; error: boolean } => {
    let result = 0;
    let error = false;
    const op1AsNumber = Number(operand1);
    const op2AsNumber = Number(operand2);

    switch (operat) {
      case 'plus':
        result = op1AsNumber + op2AsNumber;
        break;
      case 'minus':
        result = op1AsNumber - op2AsNumber;
        break;
      case 'times':
        result = op1AsNumber * op2AsNumber;
        break;
      case 'division':
        if (op2AsNumber !== 0) {
          result = op1AsNumber / op2AsNumber;
        } else {
          error = true;
        }
        break;

      default:
        break;
    }
    return { result, error };
  };

  const operationInVisor = useMemo(() => {
    switch (operation) {
      case 'plus':
        return <FaPlus size={10} />;
      case 'minus':
        return <FaMinus size={10} />;
      case 'times':
        return <FaTimes size={10} />;
      case 'division':
        return <FaDivide size={10} />;

      default:
        return '+';
    }
  }, [operation]);

  const handleACClicked = useCallback(() => {
    setFstOperand('0');
    setSndOperand('0');
    setOperationHasFinished(true);
    setCurrentOperand('1st');
    setShouldShowSecond(false);
    setOperation('plus');

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setVisorReadOnly(false);
    setShouldShowOperation(false);
  }, []);

  const handleBackClicked = useCallback(() => {
    if (digitAndPointIsBlocked) {
      handleACClicked();
    } else {
      let value = currentOperand === '1st' ? fstOperand : sndOperand;

      if (visorReadOnly) {
        value = '0';
      } else if (value.length < 2) {
        value = '0';
      } else {
        value = value.substr(0, value.length - 1);
        if (value[value.length - 1] === '.') {
          value = value.substr(0, value.length - 1);
        }
      }

      if (currentOperand === '1st') {
        setFstOperand(value);
      } else {
        setSndOperand(value);
      }

      setShouldTurnIntoDecimal(false);
      setVisorReadOnly(false);
    }
  }, [
    currentOperand,
    digitAndPointIsBlocked,
    fstOperand,
    handleACClicked,
    sndOperand,
    visorReadOnly,
  ]);

  const handlePIClicked = useCallback(() => {
    if (currentOperand === '1st') {
      setFstOperand(Math.PI.toString());
    } else {
      setSndOperand(Math.PI.toString());
      setShouldShowSecond(true);
    }

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setOperationHasFinished(false);
    setVisorReadOnly(true);
  }, [currentOperand]);

  const handleEClicked = useCallback(() => {
    if (currentOperand === '1st') {
      setFstOperand(Math.E.toString());
    } else {
      setSndOperand(Math.E.toString());
      setShouldShowSecond(true);
    }

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setOperationHasFinished(false);
    setVisorReadOnly(true);
  }, [currentOperand]);

  const handleXExpMinusOneClicked = useCallback(() => {
    let result = 0;

    const value =
      currentOperand === '1st' ? Number(fstOperand) : Number(sndOperand);

    if (value !== 0) {
      result = 1 / value;
    }

    if (currentOperand === '1st') {
      setFstOperand(value === 0 ? 'Error: Division by 0' : result.toString());
    } else {
      setSndOperand(value === 0 ? 'Error: Division by 0' : result.toString());
      setShouldShowSecond(true);
    }

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setOperationHasFinished(false);
    setVisorReadOnly(true);
  }, [currentOperand, fstOperand, sndOperand]);

  const handleXExpTwoClicked = useCallback(() => {
    const value =
      currentOperand === '1st' ? Number(fstOperand) : Number(sndOperand);

    const result = value * value;

    if (currentOperand === '1st') {
      setFstOperand(result.toString());
    } else {
      setSndOperand(result.toString());
      setShouldShowSecond(true);
    }

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setOperationHasFinished(false);
    setVisorReadOnly(true);
  }, [currentOperand, fstOperand, sndOperand]);

  const handleXExpThreeClicked = useCallback(() => {
    const value =
      currentOperand === '1st' ? Number(fstOperand) : Number(sndOperand);

    const result = value * value * value;

    if (currentOperand === '1st') {
      setFstOperand(result.toString());
    } else {
      setSndOperand(result.toString());
      setShouldShowSecond(true);
    }

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setOperationHasFinished(false);
    setVisorReadOnly(true);
  }, [currentOperand, fstOperand, sndOperand]);

  const handleSqrtXClicked = useCallback(() => {
    let result = 0;

    const value =
      currentOperand === '1st' ? Number(fstOperand) : Number(sndOperand);

    if (value >= 0) {
      result = Math.sqrt(value);
    }

    if (currentOperand === '1st') {
      setFstOperand(value < 0 ? 'Error: Negative' : result.toString());
    } else {
      setSndOperand(value < 0 ? 'Error: Negative' : result.toString());
      setShouldShowSecond(true);
    }

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setOperationHasFinished(false);
    setVisorReadOnly(true);
  }, [currentOperand, fstOperand, sndOperand]);

  const handleNumberClicked = useCallback(
    (digit: string) => {
      if (!digitAndPointIsBlocked) {
        let operand = currentOperand === '1st' ? fstOperand : sndOperand;

        if (currentOperand === '1st' && operationHasFinished) {
          operand = '0';
        }

        let value: string;

        if (visorReadOnly || operand === '0') {
          value = digit;
        } else {
          value = operand.length < 16 ? operand.concat(digit) : operand;
        }

        if (shouldTurnIntoDecimal) {
          const decimalNumber = Number(value) / 10;
          value = decimalNumber.toString();
        }

        if (currentOperand === '1st') {
          setFstOperand(value);
          operationHasFinished && setOperationHasFinished(false);
        } else {
          setSndOperand(value);
          setShouldShowSecond(true);
        }

        setShouldTurnIntoDecimal(false);
        setVisorReadOnly(false);
      }
    },
    [
      currentOperand,
      digitAndPointIsBlocked,
      fstOperand,
      operationHasFinished,
      shouldTurnIntoDecimal,
      sndOperand,
      visorReadOnly,
    ],
  );

  const handleOperationClicked = useCallback(
    (op: 'plus' | 'minus' | 'times' | 'division') => {
      if (currentOperand === '2nd' && shouldShowSecond) {
        const { result, error } = operate(fstOperand, sndOperand, operation);

        setFstOperand(error ? 'Error: Division by 0' : result.toString());
        setSndOperand('0');
        setShouldShowSecond(false);
      }

      setCurrentOperand('2nd');
      setOperation(op);

      setShouldTurnIntoDecimal(false);
      setDigitAndPointIsBlocked(false);
      setVisorReadOnly(false);
      setShouldShowOperation(true);
    },
    [currentOperand, fstOperand, operation, shouldShowSecond, sndOperand],
  );

  const handlePointClicked = useCallback(() => {
    if (!digitAndPointIsBlocked) {
      const operand = currentOperand === '1st' ? fstOperand : sndOperand;
      if (visorReadOnly && currentOperand === '1st') {
        setFstOperand('0');
        setShouldTurnIntoDecimal(true);
        setVisorReadOnly(false);
      } else if (visorReadOnly && currentOperand === '2nd') {
        setSndOperand('0');
        setShouldTurnIntoDecimal(true);
        setVisorReadOnly(false);
      } else if (
        Number.isInteger(Number(operand)) &&
        !operationHasFinished &&
        currentOperand === '2nd' &&
        !shouldShowSecond
      ) {
        setSndOperand('0');
        setShouldTurnIntoDecimal(true);
        setShouldShowSecond(true);
      } else if (operationHasFinished) {
        setFstOperand('0');
        setShouldTurnIntoDecimal(true);
      } else {
        setShouldTurnIntoDecimal(true);
      }
    }
  }, [
    digitAndPointIsBlocked,
    currentOperand,
    fstOperand,
    sndOperand,
    visorReadOnly,
    operationHasFinished,
    shouldShowSecond,
  ]);

  const handlePlusMinusClicked = useCallback(() => {
    if (currentOperand === '1st') {
      const value = -Number(fstOperand);
      setFstOperand(value.toString());
    } else {
      const value = -Number(sndOperand);
      setSndOperand(value.toString());
    }

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
  }, [currentOperand, fstOperand, sndOperand]);

  const handlePercentClicked = useCallback(() => {
    let first = Number(fstOperand);
    let second = Number(sndOperand);

    if (currentOperand === '1st') {
      first /= 100;
    } else {
      second /= 100;
    }

    // The same of handle equals
    let result = 0;
    switch (operation) {
      case 'plus':
        result = first + second;
        break;
      case 'minus':
        result = first - second;
        break;
      case 'times':
        result = first * second;
        break;
      case 'division':
        if (second !== 0) {
          result = first / second;
        }
        break;

      default:
        break;
    }

    setFstOperand(result.toString());
    setSndOperand('0');
    setShouldShowSecond(false);
    setCurrentOperand('1st');
    setOperationHasFinished(true);
    setShouldShowOperation(false);
    setOperation('plus');

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setVisorReadOnly(false);
  }, [currentOperand, fstOperand, sndOperand, operation]);

  const handleEqualsClicked = useCallback(() => {
    const { result, error } = operate(fstOperand, sndOperand, operation);

    setFstOperand(error ? 'Error: Division by 0' : result.toString());
    setSndOperand('0');
    setShouldShowSecond(false);
    setCurrentOperand('1st');
    setOperationHasFinished(true);
    setShouldShowOperation(false);
    setOperation('plus');

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setVisorReadOnly(false);
  }, [fstOperand, sndOperand, operation]);

  const handleMemoryPlusClicked = useCallback(() => {
    const operand = currentOperand === '1st' ? fstOperand : sndOperand;

    const result = Number(memory) + Number(operand);

    setMemory(result.toString());

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setOperationHasFinished(false);
    setVisorReadOnly(true);
  }, [currentOperand, fstOperand, memory, sndOperand]);

  const handleMemoryClearClicked = useCallback(() => {
    setMemory('0');
  }, []);

  const handleMemoryCallClicked = useCallback(() => {
    if (currentOperand === '1st') {
      setFstOperand(memory);
    } else {
      setSndOperand(memory);
      setShouldShowSecond(true);
    }

    setShouldTurnIntoDecimal(false);
    setDigitAndPointIsBlocked(false);
    setOperationHasFinished(false);
    setVisorReadOnly(true);
  }, [currentOperand, memory]);

  return (
    <>
      <Header />
      <Container>
        <CalcBackground>
          <Visor>
            <TopPortion
              memory={!!Number(memory)}
              shouldShowOperation={shouldShowOperation}
            >
              <div />
              <div>
                <span>Mem</span>
                <span>{operationInVisor}</span>
              </div>
            </TopPortion>
            <BottomPortion>
              {shouldShowSecond ? sndOperand : fstOperand}
              {!shouldShowSecond && Number.isInteger(Number(fstOperand)) && '.'}
              {shouldShowSecond && Number.isInteger(Number(sndOperand)) && '.'}
            </BottomPortion>
          </Visor>
          <FirstLine>
            <div />
            <div>
              <RedButton onClick={handleMemoryClearClicked}>MC</RedButton>
              <RedButton onClick={handleBackClicked}>
                <FaBackspace size={22} />
              </RedButton>
              <RedButton onClick={handleACClicked}>AC</RedButton>
            </div>
          </FirstLine>
          <SecondLine>
            <SmallButton onClick={handlePIClicked}>
              <Formula>{formulaPi}</Formula>
            </SmallButton>
            <SmallButton onClick={handleEClicked}>
              <Formula>{formulaE}</Formula>
            </SmallButton>
            <SmallButton onClick={handleXExpMinusOneClicked}>
              <Formula>{formulaXExpM1}</Formula>
            </SmallButton>
            <SmallButton onClick={handleXExpTwoClicked}>
              <Formula>{formulaXExp2}</Formula>
            </SmallButton>
            <SmallButton onClick={handleXExpThreeClicked}>
              <Formula>{formulaXExp3}</Formula>
            </SmallButton>
            <SmallButton onClick={handleSqrtXClicked}>
              <Formula>{formulaSqrtX}</Formula>
            </SmallButton>
          </SecondLine>
          <SimpleOperation>
            <BigButton
              onClick={() => {
                handleNumberClicked('7');
              }}
            >
              7
            </BigButton>
            <BigButton
              onClick={() => {
                handleNumberClicked('8');
              }}
            >
              8
            </BigButton>
            <BigButton
              onClick={() => {
                handleNumberClicked('9');
              }}
            >
              9
            </BigButton>
            <BigButton onClick={handleMemoryPlusClicked}>M+</BigButton>
            <BigButton onClick={handleMemoryCallClicked}>MR</BigButton>
            <BigButton
              onClick={() => {
                handleNumberClicked('4');
              }}
            >
              4
            </BigButton>
            <BigButton
              onClick={() => {
                handleNumberClicked('5');
              }}
            >
              5
            </BigButton>
            <BigButton
              onClick={() => {
                handleNumberClicked('6');
              }}
            >
              6
            </BigButton>
            <BigButton
              onClick={() => {
                handleOperationClicked('times');
              }}
            >
              <FaTimes size={12} />
            </BigButton>
            <BigButton
              onClick={() => {
                handleOperationClicked('division');
              }}
            >
              <FaDivide size={11} />
            </BigButton>
            <BigButton
              onClick={() => {
                handleNumberClicked('1');
              }}
            >
              1
            </BigButton>
            <BigButton
              onClick={() => {
                handleNumberClicked('2');
              }}
            >
              2
            </BigButton>
            <BigButton
              onClick={() => {
                handleNumberClicked('3');
              }}
            >
              3
            </BigButton>
            <BigButton
              onClick={() => {
                handleOperationClicked('plus');
              }}
            >
              <FaPlus size={12} />
            </BigButton>
            <BigButton
              onClick={() => {
                handleOperationClicked('minus');
              }}
            >
              <FaMinus size={11} />
            </BigButton>
            <BigButton
              onClick={() => {
                handleNumberClicked('0');
              }}
            >
              0
            </BigButton>
            <BigButton onClick={handlePointClicked}>.</BigButton>
            <BigButton onClick={handlePlusMinusClicked}>
              <FaPlus size={12} />/<FaMinus size={12} />
            </BigButton>
            <BigButton onClick={handlePercentClicked}>%</BigButton>
            <BigButton onClick={handleEqualsClicked}>
              <FaEquals size={11} />
            </BigButton>
          </SimpleOperation>
        </CalcBackground>
      </Container>
    </>
  );
};

export default Calculator;
