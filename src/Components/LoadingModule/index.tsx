import React, {useState, useEffect} from "react";

import { Container, Loader, TitleLoader } from './styled';


export function LoadingModule(){

    const [msg, setMsg] = useState('Aguarde...');

    useEffect(() => {

        setTimeout(() => {
            setMsg('Só mais um momento...');
        }, 1000);

    }, []);

    return (
        <Container>
            <Loader />
            <TitleLoader>{msg}</TitleLoader>
        </Container>
    )

}