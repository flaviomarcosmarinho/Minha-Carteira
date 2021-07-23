import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    Tooltip
} from 'recharts';

import formatCurrency from "../../utils/formatCurrency";

import { 
    Container,
    SideLeft, 
    SideRight,
    LegendContainer,
    Legend,
 } from "./styles";

 interface IBarChartBoxProps {
     title: string;
     data: {
         name: string;
         amount: number;
         percent: number;
         color: string;
     }[]
 }

const BarChartBox: React.FC<IBarChartBoxProps> = ({ title, data }) => {
    return (
        <Container>
            <SideLeft>
                <h2>{title}</h2>

                <LegendContainer>
                {
                    data.map(item => (
                        <Legend key={item.name} color={item.color}>
                            <div>{item.percent}%</div>
                            <span>{item.name}</span>
                            
                        </Legend>
                    ))
                }       
            </LegendContainer>
            </SideLeft>

            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar dataKey="amount" name="Valor">
                            { 
                                data.map((indicator) => (
                                    <Cell 
                                        key={indicator.name}
                                        cursor="pointer"
                                        fill={indicator.color}                                        
                                    />
                                ))
                            }
                        </Bar>
                        <Tooltip cursor={{ fill: 'none' }} formatter={formatCurrency}/>
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    );
}

export default BarChartBox;