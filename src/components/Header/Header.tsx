import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './Header.module.scss';
import Image from 'next/image';

const DynamicModal = dynamic(() => import('./Modal/Modal'), { ssr: false });

const Header = ({ onAddNumbers }: { onAddNumbers: (numbers: number[]) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <p>Лабораторна робота 1</p>
        <button onClick={handleOpenModal}>
          <Image src="/database.svg" alt="Logo" width={30} height={30} />
        </button>
      </header>

      {isModalOpen && (
        <DynamicModal isOpen={isModalOpen} onClose={handleCloseModal} onAddNumbers={onAddNumbers} />
      )}
    </>
  );
};

export default Header;
