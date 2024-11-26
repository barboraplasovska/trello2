import { CardDto } from "../../../core/models/CardDto";
import CardItem from "./CardItem";


export default function CardList({cards} : { cards : CardDto[]}) {
    return (
        <div className="card-list">
            {cards.map((card) => <CardItem card={card}/>)}
        </div>
    )
}