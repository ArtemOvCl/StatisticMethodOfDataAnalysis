
import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import { gsap } from 'gsap';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNumbers: (numbers: number[]) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAddNumbers }) => {
  const [inputValue, setInputValue] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleAddNumber = useCallback(() => {
    const number = parseFloat(inputValue.trim());
    if (!isNaN(number)) {
      setNumbers(prevNumbers => [...prevNumbers, number]);
      setInputValue("");
    }
  }, [inputValue]);

  const handleSubmit = useCallback(() => {
    onAddNumbers(numbers);
    setNumbers([]);
    onClose();
  }, [numbers, onAddNumbers, onClose]);

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        gsap.fromTo(modalRef.current, 
          { opacity: 0, y: 100 }, 
          { opacity: 1, y: 0, ease: "power2.out", duration: 1 }
        );
      } else {
        gsap.to(modalRef.current, 
          { opacity: 0, scale: 0.9, duration: 0.3 }
        );
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.header}>
          <Image
            src="/pie-chart.svg"
            alt="Modal Header"
            width={40}
            height={40}
            objectFit="cover"
          />
        </div>
        <div className={styles.body}>
          <div className={styles.formWrapper}>
            <div className={styles.formSection}>
              <input
                type="number"
                className={styles.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введіть число"
              />
              <Image
                src="/add.svg"
                alt="Add Number"
                width={30}
                height={30}
                onClick={handleAddNumber}
              />
            </div>
          </div>
          <div className={styles.numberList}>
            <ul>
              {numbers.map((num, index) => (
                <li key={index}>{num}</li>
              ))}
            </ul>
          </div>

          <div className={styles.buttons}>
            <button onClick={handleSubmit}>Підтвердити</button>
            <button onClick={onClose}>Закрити</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Modal;