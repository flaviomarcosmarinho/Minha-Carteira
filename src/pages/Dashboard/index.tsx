import React, {useState} from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

import { Container } from "./styles";

const Dashboard: React.FC = () => {
    const [filterSelected, setFilterSelected] = useState<string>('');    

    const options = [
        {value: 'Flávio', label: 'Flávio'},
        {value: 'Natália', label: 'Natália'},
        {value: 'Stela', label: 'Stela'},
    ];

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={options} onChange={(e) => setFilterSelected(e.target.value)} />
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;