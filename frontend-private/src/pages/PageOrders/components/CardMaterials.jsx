import React, { useState } from 'react';
import Card from "../../../assets/calmness.jpg";
import { ChevronDown, ChevronUp } from "lucide-react";


const CardMaterials = ({ ordenVenta, material }) => {


    const [isActive, setIsActive] = useState(false);


    return (
        <>
            <div className="accordion-item p-2 border-b border-t">
                <div
                    className="accordion-item-title flex items-center justify-around w-full p-2 font-medium gap-3"
                    onClick={() => setIsActive(!isActive)}
                >
                    {ordenVenta.map((item, index) => (
                        <div className="flex items-center justify-center gap-2" key={index}>
                            <img src={item.img} alt="" className="w-10 h-14 object-contain" />
                            <p>{item.producto}</p>
                            <p>{item.variante}</p>
                        </div>
                    ))}
                    <div>{isActive ? <ChevronUp /> : <ChevronDown />}</div>
                </div>
                {isActive &&
                    <ul class="accordion-it em-content p-5 border-t-2 border-t-gray-400 w-full">
                        {material ? (
                            material.map((item, index) => (

                                //sino se manda con los nombres de cantidad y material
                                /*
                                <li key={index} className="text-sm">
                                    {Object.entries(item).map(([key, value]) => (
                                        <span key={key} className=" mr-2.5">
                                            {value}
                                        </span>
                                    ))}
                                </li>*/

                                //Si se manda con los nombres de cantidad o material (de todas formas se puede cambiar)
                                <li key={index} className="text-sm">
                                    {item.material} - {item.cantidad}
                                </li>
                            ))
                        ) : (
                            <p>No hay materiales disponibles</p>
                        )}
                    </ul>
                }
            </div>
        </>
    )
}
export default CardMaterials;