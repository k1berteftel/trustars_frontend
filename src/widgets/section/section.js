//import './section.css'


export default function Section({key, title, description}) {
    return (
        <div>
            <li className="section" key={key}>
                <h3 className="section-title">{title}</h3>
                <p className="section-description" >{description}</p> 
            </li>
        </div>
    )
}
//dangerouslySetInnerHTML={{ __html: typeof description === 'string' ? description : '' }}