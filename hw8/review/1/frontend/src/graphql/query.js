import {gql} from '@apollo/client';

const USER_QUERY = gql`
    query{
        user(userName:"max"){
            id
            userName
        }
    }
`;

export  {USER_QUERY};