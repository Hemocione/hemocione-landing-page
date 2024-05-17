import { useEffect, useState } from "react";
import styles from './BloodBrothersDialog.module.css'

const BloodBrothersDialog = () => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if(showModal) document.body.style.overflow = 'hidden';
  })

  function closeModal() {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  }

  if(!showModal) return null;

  return (
    <div className={styles.container} onClick={closeModal} role="presentation">
      <div className={styles.modal} open={showModal}>
        <a href="https://apoie.hemocione.com.br" rel="noreferrer" target="_blank">
          <img alt="Doe Sangue, Doe Vida" height={1080} src="/e-banner.png" width={1920} />
        </a>
        <div className={styles.close}>X</div>
      </div>
    </div>
  );
}

export default BloodBrothersDialog;