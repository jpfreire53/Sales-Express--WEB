import styles from "./PaymentReceipt.module.css";
import jsPDF from "jspdf";

const PaymentReceipt = ({ open, onClose, selectSales, setOpenModal }) => {
  const handleDownload = () => {
    const pdf = new jsPDF();

    if (selectSales) {
      pdf.text(20, 20, `Nome: ${selectSales.sale.name}`);
      pdf.text(20, 30, `CPF: ${selectSales.sale.cpf}`);
      pdf.text(20, 40, `E-mail: ${selectSales.sale.email}`);

      pdf.text(
        20,
        80,
        `Valor Recebido: ${formatCurrency(
          selectSales.sale.value + selectSales.sale.moneyChange
        )}`
      );
      pdf.text(
        20,
        90,
        `Valor Venda: ${formatCurrency(selectSales.sale.value)}`
      );
      pdf.text(
        20,
        100,
        `Troco Devido: ${formatCurrency(selectSales.sale.moneyChange)}`
      );
    }
    pdf.save("comprovante.pdf");
  };
  const closePopUp = () => {
    setOpenModal(false);
  };

  if (!open) return null;

  const formatCurrency = (value) => {
    return (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div onClick={onClose} className={styles.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <div className={styles.allContainer}>
          {selectSales && (
            <div className={styles.content}>
              <div className={styles.contentDetails}>
                <div className={styles.divName}>
                  <label className={styles.lblName}>Nome</label>
                  <p>{selectSales.sale.name}</p>
                </div>
                <div className={styles.divCpf}>
                  <label className={styles.lblCpf}>CPF</label>
                  <p>{selectSales.sale.cpf}</p>
                </div>
              </div>
              <div className={styles.divEmail}>
                <label className={styles.email}>E-mail</label>
                <p>{selectSales.sale.email}</p>
              </div>
              <div className={styles.minhaLinha}></div>
              <div className={styles.contenItems}>
                <div className={styles.contentDetailsItems}>
                  <div className={styles.containerItemsId}>
                    <label className={styles.lblItem}>Itm</label>
                    {selectSales.items.map((item, index) => (
                      <p>{index + 1}</p>
                    ))}
                  </div>
                  <div className={styles.containerDescription}>
                    <label className={styles.lblDescription}>Descrição</label>
                    {selectSales.items.map((item) => (
                      <p>{item.description}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.minhaLinha}></div>
              <div className={styles.contentValues}>
                <div className={styles.valueR}>
                  <p>Valor recebido</p>
                  <p>
                    {formatCurrency(
                      selectSales.sale.value + selectSales.sale.moneyChange
                    )}
                  </p>
                </div>
                <div className={styles.value}>
                  <p>Valor venda</p>
                  <p>{formatCurrency(selectSales.sale.value)}</p>
                </div>
                <div className={styles.moneyChange}>
                  <p>Troco devido</p>
                  <p>{formatCurrency(selectSales.sale.moneyChange)}</p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.btnContainer}>
            <button className={styles.btnPrimary} onClick={handleDownload}>
              SALVAR
            </button>
            <button className={styles.btnPrimary} onClick={window.print}>
              IMPRIMIR
            </button>
            <button className={styles.btnOutline} onClick={closePopUp}>
              FECHAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
