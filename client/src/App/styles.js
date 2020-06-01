import styled from 'styled-components';

const Application = styled.div`
    font-family: Roboto;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    @media (min-width: 800px) {
        position: absolute;
        top: 25%;
        left: 25%;
        width: 50%;
        height: 50%;
    }
`;

const Wrapper = styled.div`
    form {
        display: flex;
        flex-direction: column;
    }
`

export {
    Application,
    Wrapper
};