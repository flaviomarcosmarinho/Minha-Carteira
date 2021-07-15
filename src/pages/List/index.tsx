import React, { useMemo, useState, useEffect } from "react";
import { v4 as uuid_v4 } from "uuid";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

import { Container, Content, Filters } from './styles'
import { ThemeContext } from "styled-components";

interface IRouteParams {
    match: {
        params: {
            type: string;
        } 
    }
}

//Interface para carregar os dados jSon que serão recuperados da API
interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1); //String(new Date().getMonth() + 1 é para pegar o mes atual no filtro como default
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear()); //String(new Date().getFullYear()) é para pegar o ano atual no filtro como default
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']); //Estado utilizado para armazenar as frequências. Irá começar com um array de string e os dois filtros habilitados.

    const movimentType = match.params.type;

    /* Pegando o parametro passado pela rota para alterar o title */
    /* Para fazer isto, utiliza-se o Hook do React useMemo passando o [(type)movimentType] para ficar monitorando a lateração */    
    const pageData = useMemo(() => {
        return movimentType === 'entry-balance' 
            ?
            {
                title: 'Entradas',
                lineColor: '#4E41F0',
                data: gains
            }
            :
            {
                title: 'Saídas',
                lineColor: '#E44C4E',
                data: expenses
            }        
    }, [movimentType]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        
        const { data } = pageData;

        data.forEach(item => {
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

    }, [pageData]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });
    }, []);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0){
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected((prev) => [...prev, frequency]); //Operador de spread, para manter o que já estava na lista e adicionar também o novo filtro.
        }
    }

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

    useEffect(() => { //Filtragem dos registros
        const { data } = pageData;

        const filteredDate = data.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });

        const formattedDate = filteredDate.map(item => {
            return {
                id: uuid_v4(), //Criando um id aleatório com uuidv4 (yarn add uuidv4)
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        });

        setData(formattedDate);
    },[pageData, monthSelected, yearSelected, frequencyFilterSelected]);

    return (
       <Container>
           <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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

            <Filters>
                <button type="button" 
                        className={`tag-filter 
                                    tag-filter-recurrent
                                    ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`} //Exemplo de classe baseada em condição. Para funcionar, tem que utilizar a interpolação de string ``
                        onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button type="button" 
                        className={`tag-filter  
                                    tag-filter-eventual
                                    ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`} //Exemplo de classe baseada em condição.
                        onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        /> 
                    ))
                }               
            </Content>
       </Container>
    );
}

export default List;