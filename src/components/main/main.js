import Section from "../../widgets/section/section"
import { datas } from "../../entities/data"
import './main.css'

export default function Main() {
    let sections = datas.map(section => (
        <Section
            key={section.key} 
            title={section.title}
            description={section.description}
        />
    ))
    return (
        <main>
            <h2>Что вы получаете приобретая франшизу от Truststars</h2>
            <div>
                <ul className="items">
                    {sections}
                </ul>
            </div>
        </main>
    )
}