import React, {useMemo, useState, useEffect} from "react";
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
    dataFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1)); //String(new Date().getMonth() + 1 é para pegar o mes atual no filtro como default
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear())); //String(new Date().getFullYear()) é para pegar o ano atual no filtro como default

    const { type } = match.params;

    /* Pegando o parametro passado pela rota para alterar o title */
    /* Para fazer isto, utiliza-se o Hook do React useMemo passando o [type] para ficar monitorando a lateração */
    const title = useMemo(() => {
        return type === 'entry-balance' ? 'Entradas':'Saídas'
    }, [type]);

    const lineColor = useMemo(() => {
        return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
    }, [type]);

    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
    }, [type]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        
        listData.forEach(item => {
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

    }, [listData]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });
    }, []);

    useEffect(() => {
        const filteredDate = listData.filter(item => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return month === monthSelected && year === yearSelected;
        });

        const formattedDate = filteredDate.map(item => {
            return {
                id: uuid_v4(), //Criando um id aleatório com uuidv4 (yarn add uuidv4)
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        });

        setData(formattedDate);
    },[listData, monthSelected, yearSelected]);

    return (
       <Container>
           <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
                <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected} />
            </ContentHeader>

            <Filters>
                <button type="button" className="tag-filter tag-filter-recurrent">
                    Recorrentes
                </button>

                <button type="button" className="tag-filter  tag-filter-eventual">
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
                            subtitle={item.dataFormatted}
                            amount={item.amountFormatted}
                        /> 
                    ))
                }               
            </Content>
       </Container>
    );
}

export default List;