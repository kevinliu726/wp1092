import { gql } from "@apollo/client";

const STATSCOUNT_QUERY = gql`
  query statsCount($severity: Int, $locationKeywords: [String!]!) {
    statsCount(severity: $severity, locationKeywords: $locationKeywords)
  }
`;

const UPLOAD_MUTATION = gql`
  mutation insertPeople($data: [insertPeopleInput]) {
    insertPeople(data: $data)
  }
`;

export { STATSCOUNT_QUERY, UPLOAD_MUTATION };
