import React, {useState, useMemo} from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import listOfMonths from "../../utils/months";

import { Container, Content } from "./styles";

const Dashboard: React.FC = () => { 
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1); //String(new Date().getMonth() + 1 é para pegar o mes atual no filtro como default
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear()); //String(new Date().getFullYear()) é para pegar o ano atual no filtro como default

    const options = [
        {value: 'Flávio', label: 'Flávio'},
        {value: 'Natália', label: 'Natália'},
        {value: 'Stela', label: 'Stela'},
    ];

    const years = useMemo(() => {
        let uniqueYears: number[] = [];          

        //Ciriando uma nova lista com o conteudo do expenses e gains utilizando o operador de spread
        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)) { //Se o ano não está na lista
                uniqueYears.push(year); //Adiciona na lista
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        });

    }, []);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });
    }, []);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } 
        catch (error) {
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } 
        catch (error) {
            throw new Error('invalid year value. Is accept 0 - 12.')
        }
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput 
                    options={months} 
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={monthSelected} 
                />
                <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected} 
                />
            </ContentHeader>
            <Content>
                <WalletBox 
                    title="Saldo"
                    amount={150.00}
                    footerLabel="Atualizado com base nas entradas e saídas."
                    icon="dolar"
                    color="#4E41F0"
                />

                <WalletBox 
                    title="Entradas"
                    amount={5000.00}
                    footerLabel="Atualizado com base nas entradas e saídas."
                    icon="arrowUp"
                    color="#F7931B"
                />

                <WalletBox 
                title="Saídas"
                amount={4850.00}
                footerLabel="Atualizado com base nas entradas e saídas."
                icon="arrowDown"
                color="#E44C4E"
            />
            </Content>
        </Container>
    );
}

export default Dashboard;