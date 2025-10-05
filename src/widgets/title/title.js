//import './title.css'
import headerStars from './header_stars.png';

import { useNavigate } from 'react-router-dom';


export default function Title() {
    const navigate = useNavigate();
    const handleClick = () => {
         navigate('/rates')
    }
    return (
        <>
            <img src={headerStars} alt="Trustars Logo" className="stars"></img> 
            <h1 className="title">
                Запустите свой бот по продаже Telegram Stars с готовой франшизой
            </h1>
            <button className="redirect-btn" onClick={handleClick}>
                Начни зарабатывать с нами
            </button>
        </>
    )
} 