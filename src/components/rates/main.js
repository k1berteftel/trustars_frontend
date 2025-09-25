import { useState } from "react"
import { rates } from "../../entities/data"
import PaymentModal from '../payment/payment'
import './main.css'


export default function MainRates  () {
    const [selectedRate, setSelectedRate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleBuyClick = (rate) => {
        setSelectedRate(rate);
        setIsModalOpen(true);
    }
    let html_rates = rates.map(rate => (
        <li key={rate.key}>
            <div className={`rates ${rate.key}`}>
                <h1 className="rate-title">{rate.title}</h1>
                {rate.old_price && <h2 className="rate-title"><del>{rate.old_price}</del></h2>}
                <h2 className="rate-title">от {rate.price}</h2>
                <ul className="rate-points">
                    {rate.points.map(point => (
                        <li key={point.key} className="rate-point">{point.content}</li>
                        ))}
                </ul>
                <button 
                    className="buy-btn"
                    onClick={() => handleBuyClick(rate.key)}
                    >Купить
                </button>
            </div>
        </li>
    ))
    return (
        <main>
            <h1 className="title">ТАРИФЫ</h1>
            <div className="rates-block">
                <ul className="rates-blocks">{html_rates}</ul>
            </div>
            {isModalOpen && selectedRate && (
                <PaymentModal
                rate={selectedRate}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedRate(null);
                }}
                />
            )}
        </main>
        
    )
}