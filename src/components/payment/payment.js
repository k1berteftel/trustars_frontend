import { useState, useEffect, useCallback } from "react";
import './payment.css';

export default function PaymentModal({ rate, onClose }) {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [polling, setPolling] = useState(false); // ← изначально false

  const handlePaymentClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handlePaymentSuccess = useCallback(() => {
    setPolling(false);

    if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;

        webApp.sendData(JSON.stringify({
            event: 'payment_success',
            order_id: paymentData.id
        }));

        webApp.showPopup({
            title: "✅ Оплата прошла!",
            message: "Спасибо за покупку! Web App закроется через 3 секунды.",
            buttons: [{ type: "ok" }]
        });

        onClose();

        setTimeout(() => {
            webApp.close();
        }, 3000);
    }
}, [paymentData?.id, onClose]); // ← зависимости, от которых зависит функция


  // Загружаем данные при открытии модалки
  useEffect(() => {
    const fetchPaymentData = async () => {
      const webApp = window.Telegram.WebApp;
      try {
        const response = await fetch(`https://truststars.ru/api/payment?rate=${rate}&user_id=${webApp.initDataUnsafe.user.id}`);
        if (!response.ok) throw new Error("Не удалось загрузить данные оплаты");

        const data = await response.json();
        setPaymentData(data);

        // ✅ Запускаем поллинг только если есть order_id
        if (data?.id) {
          setPolling(true);
        }
      } catch (err) {
        console.error(err);
        setError("Ошибка загрузки данных оплаты");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [rate]);

  // Поллинг статуса оплаты
  useEffect(() => {
    if (!polling || !paymentData?.id) return;

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`https://truststars.ru/api/status?order_id=${paymentData.id}`);
        if (!response.ok) throw new Error("Не удалось проверить статус");

        const data = await response.json();

        if (data.status === 'paid') {
          clearInterval(intervalId);
          handlePaymentSuccess();
        } else if (data.status === 'failed') {
          clearInterval(intervalId);
          setError("Во время оплаты что-то пошло не так, пожалуйста обратитесь в поддержку");
          setPolling(false); // ← останавливаем поллинг
        }
      } catch (err) {
        console.error("Ошибка при проверке статуса:", err);
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [polling, paymentData?.id, handlePaymentSuccess]);

  const handleClose = () => {
    setPolling(false);
    onClose();
  };

  if (loading) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Загрузка...</h3>
            <button className="close-btn" onClick={handleClose}>×</button>
          </div>
          <div className="loading">⏳ Пожалуйста, подождите...</div>
        </div>
      </div>
    );
  }

  if (error || !paymentData) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Ошибка</h3>
            <button className="close-btn" onClick={handleClose}>×</button>
          </div>
          <p>{error || "Не удалось загрузить данные"}</p>
          <button className="retry-btn" onClick={handleClose}>Закрыть</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>К оплате: {paymentData.amount}₽</h3>
          <p>Тариф: {paymentData.rate}</p>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        <hr />
        <div className="payment-methods">
          {Array.isArray(paymentData.payments) && paymentData.payments.length > 0 ? (
            paymentData.payments.map((method) => (
              <button
                key={method.id}
                className={`payment-btn ${method.id}`}
                onClick={() => handlePaymentClick(method.url)}
                disabled={!method.url}
              >
                <span className="icon">{method.icon}</span>
                <span>{method.name}</span>
              </button>
            ))
          ) : (
            <p>Нет доступных методов оплаты</p>
          )}
        </div>
      </div>
    </div>
  );
}