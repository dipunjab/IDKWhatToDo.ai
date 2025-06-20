import {Link, useLocation} from "react-router";
import {ChipDirective, ChipListComponent, ChipsDirective} from "@syncfusion/ej2-react-buttons";
import {cn, getFirstWord} from "../lib/utlis";

const CareerCard = ({ id, name, description,imageUrl, tags }: CareerCardProps) => {
    const path = useLocation();

    return (
        <Link to={`/careers/${id}`} className="career-card">
            <img src={imageUrl} alt={name} />
            
            <article>
                <h2>{name}</h2>
                <figure>
                    <figcaption>
                        {description.slice(0,60)} . . . . .
                    </figcaption>
                </figure>
            </article>

            <div className="mt-5 pl-[18px] pr-3.5 pb-2">
                <ChipListComponent id="career-chip">
                    <ChipsDirective>
                        {tags?.slice(0,2).map((tag, index) => (
                            <ChipDirective
                                key={index}
                                text={getFirstWord(tag)}
                                cssClass={cn(index===1
                                ? '!bg-pink-50 !text-pink-500'
                                : '!bg-success-50 !text-success-700')}
                            />
                        ))}
                    </ChipsDirective>
                </ChipListComponent>
            </div>
        </Link>
    )
}
export default CareerCard