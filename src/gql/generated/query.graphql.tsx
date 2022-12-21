import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export enum Assignment_Status {
  Completed = "COMPLETED",
  Created = "CREATED",
  InProgress = "IN_PROGRESS",
  PendingReview = "PENDING_REVIEW",
}

export type AdminUser = {
  __typename?: "AdminUser";
  createdDate?: Maybe<Scalars["DateTime"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  emailId: Scalars["String"];
  firstName: Scalars["String"];
  idAdminUser: Scalars["String"];
  isActive: Scalars["Boolean"];
  lastName: Scalars["String"];
  pwd: Scalars["String"];
  updatedDate?: Maybe<Scalars["DateTime"]>;
};

export type Answer = {
  __typename?: "Answer";
  answerText: Scalars["String"];
  createdDate?: Maybe<Scalars["DateTime"]>;
  idAnswer: Scalars["ID"];
  needsProof: Scalars["Boolean"];
  points: Scalars["Int"];
  question: Question;
  refIdForms: Scalars["Int"];
  refIdQuestion: Scalars["Int"];
  updatedDate?: Maybe<Scalars["DateTime"]>;
};

export type Assignment = {
  __typename?: "Assignment";
  assignmentStatus: Assignment_Status;
  createdDate?: Maybe<Scalars["DateTime"]>;
  form: Form;
  idAssignment: Scalars["ID"];
  refIdDealerUser: Scalars["String"];
  updatedDate?: Maybe<Scalars["DateTime"]>;
};

export type AssignmentSubmissionInput = {
  fileKey?: InputMaybe<Array<Scalars["String"]>>;
  refIdAnswer: Scalars["Int"];
  refIdAssignment: Scalars["Int"];
  refIdQuestion: Scalars["Int"];
};

export type CountryToScoreRes = {
  __typename?: "CountryToScoreRes";
  data: Array<Scalars["JSON"]>;
};

export type CreateDealerInput = {
  address1?: InputMaybe<Scalars["String"]>;
  address2?: InputMaybe<Scalars["String"]>;
  contactPersonEmail?: InputMaybe<Scalars["String"]>;
  contactPersonName?: InputMaybe<Scalars["String"]>;
  contactPersonPhone?: InputMaybe<Scalars["String"]>;
  country: Scalars["String"];
  emailId: Scalars["String"];
  joinDate: Scalars["DateTime"];
  landLine?: InputMaybe<Scalars["String"]>;
  mediaUrl?: InputMaybe<Scalars["String"]>;
  mobile?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  pwd: Scalars["String"];
  website?: InputMaybe<Scalars["String"]>;
};

export type DealerSubmission = {
  __typename?: "DealerSubmission";
  createdDate?: Maybe<Scalars["DateTime"]>;
  idDealerSubmission: Scalars["ID"];
  questionDetails: Question;
  refIdAnswer: Scalars["Int"];
  refIdAssignment: Scalars["Int"];
  refIdDealerUser: Scalars["String"];
  refIdQuestion: Scalars["Int"];
  submission_status: Submission_Status;
  updatedDate?: Maybe<Scalars["DateTime"]>;
  userProof?: Maybe<Array<UserProof>>;
};

export type DealerUser = {
  __typename?: "DealerUser";
  address1?: Maybe<Scalars["String"]>;
  address2?: Maybe<Scalars["String"]>;
  assignment?: Maybe<Array<Assignment>>;
  contactPersonEmail?: Maybe<Scalars["String"]>;
  contactPersonName?: Maybe<Scalars["String"]>;
  contactPersonPhone?: Maybe<Scalars["String"]>;
  country: Scalars["String"];
  createdDate?: Maybe<Scalars["DateTime"]>;
  emailId: Scalars["String"];
  idDealerUser: Scalars["ID"];
  joinDate: Scalars["DateTime"];
  landLine?: Maybe<Scalars["String"]>;
  mediaUrl?: Maybe<Scalars["String"]>;
  mobile?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  pwd: Scalars["String"];
  updatedDate?: Maybe<Scalars["DateTime"]>;
  website?: Maybe<Scalars["String"]>;
};

export type EditDealerInput = {
  address1?: InputMaybe<Scalars["String"]>;
  address2?: InputMaybe<Scalars["String"]>;
  contactPersonEmail?: InputMaybe<Scalars["String"]>;
  contactPersonName?: InputMaybe<Scalars["String"]>;
  contactPersonPhone?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  emailId?: InputMaybe<Scalars["String"]>;
  idDealerUser: Scalars["String"];
  joinDate?: InputMaybe<Scalars["DateTime"]>;
  landLine?: InputMaybe<Scalars["String"]>;
  mediaUrl?: InputMaybe<Scalars["String"]>;
  mobile?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  pwd?: InputMaybe<Scalars["String"]>;
  website?: InputMaybe<Scalars["String"]>;
};

export type EvaluateAssignmentInput = {
  refIdAssignment: Scalars["Int"];
  refIdQueston: Scalars["Int"];
  status: Scalars["String"];
};

export type ExportDealerScoresInput = {
  idDealerUser?: InputMaybe<Scalars["String"]>;
};

export type ExportDealersScoresResponse = {
  __typename?: "ExportDealersScoresResponse";
  mediaUrl: Scalars["String"];
};

export type FilterInput = {
  emailId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  mobile?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Form = {
  __typename?: "Form";
  createdDate?: Maybe<Scalars["DateTime"]>;
  formDescription?: Maybe<Scalars["String"]>;
  formTitle?: Maybe<Scalars["String"]>;
  idForm: Scalars["ID"];
  isActive: Scalars["Boolean"];
  questions?: Maybe<Array<Question>>;
  updatedDate?: Maybe<Scalars["DateTime"]>;
};

export type GetDealerResponse = {
  __typename?: "GetDealerResponse";
  dealer: DealerUser;
  score?: Maybe<Scalars["Float"]>;
};

export type ListDealerResponse = {
  __typename?: "ListDealerResponse";
  results: Array<DealerUser>;
  scores?: Maybe<Scalars["Float"]>;
  totalRows?: Maybe<Scalars["Float"]>;
};

export type ListDealersInputs = {
  filter?: InputMaybe<FilterInput>;
  limit: Scalars["Float"];
  offset?: InputMaybe<Scalars["Float"]>;
};

export type LoginAsDealerInput = {
  emailId: Scalars["String"];
  password: Scalars["String"];
};

export type LoginAsDealerResponse = {
  __typename?: "LoginAsDealerResponse";
  accessToken: Scalars["String"];
  dealerUser: DealerUser;
};

export type Mutation = {
  __typename?: "Mutation";
  createDealerByAdmin: SuccessResponse;
  evaluateAssignment: Scalars["Boolean"];
  finalSubmission: DealerSubmission;
  loginAsAdmin: LoginAsAdminResponse;
  loginAsDealer: LoginAsDealerResponse;
  saveAssignmentAnswers: SuccessResponse;
  saveUserProofFile: UserProof;
  updateDealerByAdmin: DealerUser;
};

export type MutationCreateDealerByAdminArgs = {
  input: CreateDealerInput;
};

export type MutationEvaluateAssignmentArgs = {
  input: EvaluateAssignmentInput;
};

export type MutationFinalSubmissionArgs = {
  assignmentId: Scalars["Float"];
};

export type MutationLoginAsAdminArgs = {
  input: LoginAsAdminInput;
};

export type MutationLoginAsDealerArgs = {
  input: LoginAsDealerInput;
};

export type MutationSaveAssignmentAnswersArgs = {
  input: AssignmentSubmissionInput;
};

export type MutationSaveUserProofFileArgs = {
  fileKey: Scalars["String"];
  submissionId: Scalars["Float"];
};

export type MutationUpdateDealerByAdminArgs = {
  input: EditDealerInput;
};

export type Query = {
  __typename?: "Query";
  exportDealerScores: ExportDealersScoresResponse;
  getAllDealers: ListDealerResponse;
  getAssignment: Assignment;
  getCountryToScore: CountryToScoreRes;
  getDealer: GetDealerResponse;
  getDealerUploadUrl: S3SignedUrlResponse;
  getSubmissionStatusCount: SubmissionStatusRes;
  getUserProofFile: UserProof;
  questionAnswerCount: QuestionAnswerCountRes;
};

export type QueryExportDealerScoresArgs = {
  input: ExportDealerScoresInput;
};

export type QueryGetAllDealersArgs = {
  input: ListDealersInputs;
};

export type QueryGetAssignmentArgs = {
  assignmetId: Scalars["Float"];
};

export type QueryGetUserProofFileArgs = {
  submissionId: Scalars["Float"];
};

export type Question = {
  __typename?: "Question";
  answers?: Maybe<Array<Answer>>;
  form: Form;
  idQuestion: Scalars["ID"];
  questionOrder: Scalars["Int"];
  questionText: Scalars["String"];
  refIdForm: Scalars["Int"];
  submission?: Maybe<DealerSubmission>;
};

export type QuestionAnswerCountRes = {
  __typename?: "QuestionAnswerCountRes";
  data: Scalars["JSON"];
};

export type S3SignedUrlResponse = {
  __typename?: "S3SignedUrlResponse";
  fileName: Scalars["String"];
  signedUrl: Scalars["String"];
};

export type SubmissionStatusRes = {
  __typename?: "SubmissionStatusRes";
  accepted: Scalars["Int"];
  pending: Scalars["Int"];
  rejected: Scalars["Int"];
};

export type SuccessResponse = {
  __typename?: "SuccessResponse";
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type UserProof = {
  __typename?: "UserProof";
  createdDate?: Maybe<Scalars["DateTime"]>;
  dealerSubmissions: DealerSubmission;
  fileKey: Scalars["String"];
  idUserProof: Scalars["ID"];
  refIdSubmission: Scalars["Int"];
  updatedDate?: Maybe<Scalars["DateTime"]>;
};

export type LoginAsAdminInput = {
  emailId: Scalars["String"];
  pwd: Scalars["String"];
};

export type LoginAsAdminResponse = {
  __typename?: "loginAsAdminResponse";
  accessToken: Scalars["String"];
  adminUser: AdminUser;
};

export enum Submission_Status {
  Accepted = "ACCEPTED",
  Pending = "PENDING",
  Rejected = "REJECTED",
}

export type LoginAsAdminMutationVariables = Exact<{
  input: LoginAsAdminInput;
}>;

export type LoginAsAdminMutation = {
  __typename?: "Mutation";
  loginAsAdmin: {
    __typename?: "loginAsAdminResponse";
    accessToken: string;
    adminUser: {
      __typename?: "AdminUser";
      emailId: string;
      firstName: string;
      idAdminUser: string;
      lastName: string;
      createdDate?: any | null;
      updatedDate?: any | null;
      deletedAt?: any | null;
    };
  };
};

export type LoginAsDealerMutationVariables = Exact<{
  input: LoginAsDealerInput;
}>;

export type LoginAsDealerMutation = {
  __typename?: "Mutation";
  loginAsDealer: {
    __typename?: "LoginAsDealerResponse";
    accessToken: string;
    dealerUser: {
      __typename?: "DealerUser";
      address1?: string | null;
      address2?: string | null;
      contactPersonEmail?: string | null;
      contactPersonName?: string | null;
      contactPersonPhone?: string | null;
      country: string;
      createdDate?: any | null;
      emailId: string;
      idDealerUser: string;
      joinDate: any;
      landLine?: string | null;
      mediaUrl?: string | null;
      mobile?: string | null;
      name: string;
      updatedDate?: any | null;
      website?: string | null;
      assignment?: Array<{
        __typename?: "Assignment";
        assignmentStatus: Assignment_Status;
        createdDate?: any | null;
        idAssignment: string;
        refIdDealerUser: string;
        updatedDate?: any | null;
        form: {
          __typename?: "Form";
          createdDate?: any | null;
          formDescription?: string | null;
          formTitle?: string | null;
          idForm: string;
          updatedDate?: any | null;
          questions?: Array<{
            __typename?: "Question";
            idQuestion: string;
            questionOrder: number;
            questionText: string;
          }> | null;
        };
      }> | null;
    };
  };
};

export type GetDealerQueryVariables = Exact<{ [key: string]: never }>;

export type GetDealerQuery = {
  __typename?: "Query";
  getDealer: {
    __typename?: "GetDealerResponse";
    dealer: {
      __typename?: "DealerUser";
      address1?: string | null;
      address2?: string | null;
      contactPersonEmail?: string | null;
      contactPersonName?: string | null;
      contactPersonPhone?: string | null;
      country: string;
      createdDate?: any | null;
      emailId: string;
      idDealerUser: string;
      joinDate: any;
      landLine?: string | null;
      mediaUrl?: string | null;
      mobile?: string | null;
      name: string;
      updatedDate?: any | null;
      website?: string | null;
      assignment?: Array<{
        __typename?: "Assignment";
        assignmentStatus: Assignment_Status;
        createdDate?: any | null;
        idAssignment: string;
        refIdDealerUser: string;
        updatedDate?: any | null;
        form: {
          __typename?: "Form";
          createdDate?: any | null;
          formDescription?: string | null;
          formTitle?: string | null;
          idForm: string;
          isActive: boolean;
          updatedDate?: any | null;
          questions?: Array<{
            __typename?: "Question";
            idQuestion: string;
            questionOrder: number;
            questionText: string;
            refIdForm: number;
            form: {
              __typename?: "Form";
              createdDate?: any | null;
              formDescription?: string | null;
              formTitle?: string | null;
              idForm: string;
              isActive: boolean;
              updatedDate?: any | null;
              questions?: Array<{
                __typename?: "Question";
                idQuestion: string;
                questionOrder: number;
                questionText: string;
                refIdForm: number;
                answers?: Array<{
                  __typename?: "Answer";
                  answerText: string;
                  createdDate?: any | null;
                  idAnswer: string;
                  needsProof: boolean;
                  points: number;
                  refIdForms: number;
                  refIdQuestion: number;
                  updatedDate?: any | null;
                }> | null;
              }> | null;
            };
            answers?: Array<{
              __typename?: "Answer";
              answerText: string;
              createdDate?: any | null;
              idAnswer: string;
              needsProof: boolean;
              points: number;
              refIdForms: number;
              refIdQuestion: number;
              updatedDate?: any | null;
            }> | null;
          }> | null;
        };
      }> | null;
    };
  };
};

export type GetAssignmentQueryVariables = Exact<{
  input: Scalars["Float"];
}>;

export type GetAssignmentQuery = {
  __typename?: "Query";
  getAssignment: {
    __typename: "Assignment";
    assignmentStatus: Assignment_Status;
    idAssignment: string;
    createdDate?: any | null;
    updatedDate?: any | null;
    refIdDealerUser: string;
    form: {
      __typename: "Form";
      formTitle?: string | null;
      formDescription?: string | null;
      idForm: string;
      isActive: boolean;
      questions?: Array<{
        __typename: "Question";
        idQuestion: string;
        questionOrder: number;
        questionText: string;
        refIdForm: number;
        submission?: {
          __typename?: "DealerSubmission";
          idDealerSubmission: string;
          refIdAnswer: number;
        } | null;
        answers?: Array<{
          __typename: "Answer";
          idAnswer: string;
          answerText: string;
          createdDate?: any | null;
          updatedDate?: any | null;
          points: number;
          needsProof: boolean;
        }> | null;
      }> | null;
    };
  };
};

export type SaveAssignmentAnswersMutationVariables = Exact<{
  input: AssignmentSubmissionInput;
}>;

export type SaveAssignmentAnswersMutation = {
  __typename?: "Mutation";
  saveAssignmentAnswers: {
    __typename?: "SuccessResponse";
    success: boolean;
    message?: string | null;
  };
};

export type GetDealerUploadUrlQueryVariables = Exact<{ [key: string]: never }>;

export type GetDealerUploadUrlQuery = {
  __typename?: "Query";
  getDealerUploadUrl: {
    __typename?: "S3SignedUrlResponse";
    fileName: string;
    signedUrl: string;
  };
};

export const LoginAsAdminDocument = gql`
  mutation loginAsAdmin($input: loginAsAdminInput!) {
    loginAsAdmin(input: $input) {
      accessToken
      adminUser {
        emailId
        firstName
        idAdminUser
        lastName
        createdDate
        updatedDate
        deletedAt
      }
    }
  }
`;
export type LoginAsAdminMutationFn = Apollo.MutationFunction<
  LoginAsAdminMutation,
  LoginAsAdminMutationVariables
>;

/**
 * __useLoginAsAdminMutation__
 *
 * To run a mutation, you first call `useLoginAsAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAsAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAsAdminMutation, { data, loading, error }] = useLoginAsAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginAsAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginAsAdminMutation,
    LoginAsAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LoginAsAdminMutation,
    LoginAsAdminMutationVariables
  >(LoginAsAdminDocument, options);
}
export type LoginAsAdminMutationHookResult = ReturnType<
  typeof useLoginAsAdminMutation
>;
export type LoginAsAdminMutationResult =
  Apollo.MutationResult<LoginAsAdminMutation>;
export type LoginAsAdminMutationOptions = Apollo.BaseMutationOptions<
  LoginAsAdminMutation,
  LoginAsAdminMutationVariables
>;
export const LoginAsDealerDocument = gql`
  mutation loginAsDealer($input: LoginAsDealerInput!) {
    loginAsDealer(input: $input) {
      accessToken
      dealerUser {
        address1
        address2
        assignment {
          assignmentStatus
          createdDate
          form {
            createdDate
            formDescription
            formTitle
            idForm
            questions {
              idQuestion
              questionOrder
              questionText
            }
            updatedDate
          }
          idAssignment
          refIdDealerUser
          updatedDate
        }
        contactPersonEmail
        contactPersonName
        contactPersonPhone
        country
        createdDate
        emailId
        idDealerUser
        joinDate
        landLine
        mediaUrl
        mobile
        name
        updatedDate
        website
      }
    }
  }
`;
export type LoginAsDealerMutationFn = Apollo.MutationFunction<
  LoginAsDealerMutation,
  LoginAsDealerMutationVariables
>;

/**
 * __useLoginAsDealerMutation__
 *
 * To run a mutation, you first call `useLoginAsDealerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAsDealerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAsDealerMutation, { data, loading, error }] = useLoginAsDealerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginAsDealerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginAsDealerMutation,
    LoginAsDealerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LoginAsDealerMutation,
    LoginAsDealerMutationVariables
  >(LoginAsDealerDocument, options);
}
export type LoginAsDealerMutationHookResult = ReturnType<
  typeof useLoginAsDealerMutation
>;
export type LoginAsDealerMutationResult =
  Apollo.MutationResult<LoginAsDealerMutation>;
export type LoginAsDealerMutationOptions = Apollo.BaseMutationOptions<
  LoginAsDealerMutation,
  LoginAsDealerMutationVariables
>;
export const GetDealerDocument = gql`
  query getDealer {
    getDealer {
      dealer {
        address1
        address2
        assignment {
          assignmentStatus
          createdDate
          form {
            createdDate
            formDescription
            formTitle
            idForm
            isActive
            questions {
              form {
                createdDate
                formDescription
                formTitle
                idForm
                isActive
                questions {
                  answers {
                    answerText
                    createdDate
                    idAnswer
                    needsProof
                    points
                    refIdForms
                    refIdQuestion
                    updatedDate
                  }
                  idQuestion
                  questionOrder
                  questionText
                  refIdForm
                }
                updatedDate
              }
              answers {
                answerText
                createdDate
                idAnswer
                needsProof
                points
                refIdForms
                refIdQuestion
                updatedDate
              }
              idQuestion
              questionOrder
              questionText
              refIdForm
            }
            updatedDate
          }
          idAssignment
          refIdDealerUser
          updatedDate
        }
        contactPersonEmail
        contactPersonName
        contactPersonPhone
        country
        createdDate
        emailId
        idDealerUser
        joinDate
        landLine
        mediaUrl
        mobile
        name
        updatedDate
        website
      }
    }
  }
`;

/**
 * __useGetDealerQuery__
 *
 * To run a query within a React component, call `useGetDealerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDealerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDealerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDealerQuery(
  baseOptions?: Apollo.QueryHookOptions<GetDealerQuery, GetDealerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDealerQuery, GetDealerQueryVariables>(
    GetDealerDocument,
    options
  );
}
export function useGetDealerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDealerQuery,
    GetDealerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetDealerQuery, GetDealerQueryVariables>(
    GetDealerDocument,
    options
  );
}
export type GetDealerQueryHookResult = ReturnType<typeof useGetDealerQuery>;
export type GetDealerLazyQueryHookResult = ReturnType<
  typeof useGetDealerLazyQuery
>;
export type GetDealerQueryResult = Apollo.QueryResult<
  GetDealerQuery,
  GetDealerQueryVariables
>;
export const GetAssignmentDocument = gql`
  query getAssignment($input: Float!) {
    getAssignment(assignmetId: $input) {
      assignmentStatus
      idAssignment
      createdDate
      updatedDate
      refIdDealerUser
      __typename
      form {
        __typename
        formTitle
        formDescription
        idForm
        isActive
        questions {
          __typename
          idQuestion
          questionOrder
          questionText
          submission {
            idDealerSubmission
            refIdAnswer
          }
          refIdForm
          answers {
            __typename
            idAnswer
            answerText
            createdDate
            updatedDate
            points
            needsProof
          }
        }
      }
    }
  }
`;

/**
 * __useGetAssignmentQuery__
 *
 * To run a query within a React component, call `useGetAssignmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignmentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAssignmentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAssignmentQuery,
    GetAssignmentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAssignmentQuery, GetAssignmentQueryVariables>(
    GetAssignmentDocument,
    options
  );
}
export function useGetAssignmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAssignmentQuery,
    GetAssignmentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAssignmentQuery, GetAssignmentQueryVariables>(
    GetAssignmentDocument,
    options
  );
}
export type GetAssignmentQueryHookResult = ReturnType<
  typeof useGetAssignmentQuery
>;
export type GetAssignmentLazyQueryHookResult = ReturnType<
  typeof useGetAssignmentLazyQuery
>;
export type GetAssignmentQueryResult = Apollo.QueryResult<
  GetAssignmentQuery,
  GetAssignmentQueryVariables
>;
export const SaveAssignmentAnswersDocument = gql`
  mutation saveAssignmentAnswers($input: AssignmentSubmissionInput!) {
    saveAssignmentAnswers(input: $input) {
      success
      message
    }
  }
`;
export type SaveAssignmentAnswersMutationFn = Apollo.MutationFunction<
  SaveAssignmentAnswersMutation,
  SaveAssignmentAnswersMutationVariables
>;

/**
 * __useSaveAssignmentAnswersMutation__
 *
 * To run a mutation, you first call `useSaveAssignmentAnswersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAssignmentAnswersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAssignmentAnswersMutation, { data, loading, error }] = useSaveAssignmentAnswersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveAssignmentAnswersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveAssignmentAnswersMutation,
    SaveAssignmentAnswersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SaveAssignmentAnswersMutation,
    SaveAssignmentAnswersMutationVariables
  >(SaveAssignmentAnswersDocument, options);
}
export type SaveAssignmentAnswersMutationHookResult = ReturnType<
  typeof useSaveAssignmentAnswersMutation
>;
export type SaveAssignmentAnswersMutationResult =
  Apollo.MutationResult<SaveAssignmentAnswersMutation>;
export type SaveAssignmentAnswersMutationOptions = Apollo.BaseMutationOptions<
  SaveAssignmentAnswersMutation,
  SaveAssignmentAnswersMutationVariables
>;
export const GetDealerUploadUrlDocument = gql`
  query getDealerUploadUrl {
    getDealerUploadUrl {
      fileName
      signedUrl
    }
  }
`;

/**
 * __useGetDealerUploadUrlQuery__
 *
 * To run a query within a React component, call `useGetDealerUploadUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDealerUploadUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDealerUploadUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDealerUploadUrlQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetDealerUploadUrlQuery,
    GetDealerUploadUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetDealerUploadUrlQuery,
    GetDealerUploadUrlQueryVariables
  >(GetDealerUploadUrlDocument, options);
}
export function useGetDealerUploadUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDealerUploadUrlQuery,
    GetDealerUploadUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetDealerUploadUrlQuery,
    GetDealerUploadUrlQueryVariables
  >(GetDealerUploadUrlDocument, options);
}
export type GetDealerUploadUrlQueryHookResult = ReturnType<
  typeof useGetDealerUploadUrlQuery
>;
export type GetDealerUploadUrlLazyQueryHookResult = ReturnType<
  typeof useGetDealerUploadUrlLazyQuery
>;
export type GetDealerUploadUrlQueryResult = Apollo.QueryResult<
  GetDealerUploadUrlQuery,
  GetDealerUploadUrlQueryVariables
>;
