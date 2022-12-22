import React, { useEffect, useState } from "react";
import { Button, Card, Col, Divider, Input, Row, Select, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../utils/context";
import { Assignment, useDealerFinalSubmissionMutation, useGetAssignmentLazyQuery, useSaveAssignmentAnswersMutation } from "../../gql/generated/query.graphql";
import UploadComponent from "../../components/UploadComponent";


const FormSubmission = (props: any) => {

    const [data, setData] = useState<Partial<Assignment> | undefined>(undefined);

    const params = useParams();
    const authCtx = useAuthContext();
    const navigate = useNavigate();

    const [getData, { loading }] = useGetAssignmentLazyQuery({
        fetchPolicy: "no-cache",
        variables: {
            input: +params?.id!
        },
        onCompleted: (d) => {
            if (d?.getAssignment?.idAssignment){
                setData(undefined);
                const dd: any = d?.getAssignment;
                setData(dd);
                console.log(dd);
            }
        },
        onError: (d) => {
            console.log(d);
        },
        context: {
            headers: {
                Authorization: `Bearer ${authCtx.token}`
            }
        }
    });

    const [submitForm, { loading: finalSubLoading }] = useDealerFinalSubmissionMutation({
        context: {
            headers: {
                Authorization: `Bearer ${authCtx.token}`
            }
        },
        onCompleted: (d) => {
            navigate("/");
        },
        variables: {
            input: +data?.idAssignment!
        }
    })

    const [saveAnswer, { loading: SaveProcessing }] = useSaveAssignmentAnswersMutation({
        fetchPolicy: "no-cache",
        context: {
            headers: {
                Authorization: `Bearer ${authCtx.token}`
            }
        },
        onCompleted: (d) => {
            getData({
                fetchPolicy: "no-cache"
            });
        }
    })

    useEffect(() => {
        getData()
    }, [])

    const onAnswerChange = (e: any) => {
        console.log(e)
        saveAnswer({
            variables: {
                input: {
                    fileKey: [],
                    refIdAnswer: Number(e.answer),
                    refIdAssignment: Number(e.assignment),
                    refIdQuestion: Number(e.question),
                }
            }
        })
    }

    const cantSubmit = () => {
        if (!data?.form?.questions?.length) return false;
        for (let i = 0; i < data?.form?.questions?.length; i++) {
            let item = data?.form?.questions[i];

            if (item.submission) {
                let needsProof = item.answers?.find((a2) => +a2?.idAnswer === item?.submission?.refIdAnswer)?.needsProof;
                if (needsProof && !item.submission?.userProof?.length){
                    return true;
                }
            }

            if (!item?.submission){
                return true;
            }
        }
        return false;
    }

    return (
        <Row style={{ width: "100%" }}>
            <Row style={{ width: "100%" }} justify="start" wrap>
                <Col span={20}>
                    <Typography.Title level={3}>{data?.form?.formTitle}</Typography.Title>
                    <Typography.Text>{data?.assignmentStatus}</Typography.Text>
                    <Typography.Paragraph>{data?.form?.formDescription}</Typography.Paragraph>
                </Col>
                <Col span={4} style={{ justifyContent: "center", alignItems: "center", display: "flex"}}>
                    <Button type="primary" onClick={() => submitForm()} disabled={cantSubmit() || loading || finalSubLoading || data?.assignmentStatus === "PENDING_REVIEW"}>Submit</Button>
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                {
                    data ? data?.form?.questions?.map(q => {

                        return (
                            <Col key={`question-list-id-${q.idQuestion}`} span={24} style={{ marginBottom: 15}}>
                                <Card>
                                    <Typography.Title level={5} style={{ margin: "5px 0 10px 0"}}>{q.questionText} {q.idQuestion}</Typography.Title>
                                    <Divider />
                                    
                                    <Select
                                    // defaultValue="lucy"
                                    // {q}
                                    disabled={data?.assignmentStatus === "PENDING_REVIEW"}
                                    style={{ width: "100%" }}
                                    placeholder={"Select Answer "}
                                    onChange={(e) => onAnswerChange({answer: e, question: q.idQuestion, assignment: data.idAssignment})}
                                    value={q?.submission?.refIdAnswer ? {
                                        value: q.submission?.refIdAnswer,
                                        label: q.answers?.find((a2) => +a2?.idAnswer === q?.submission?.refIdAnswer)?.answerText
                                    } : null}
                                    options={q.answers?.map(a => {
                                        return {
                                            label: a.answerText,
                                            value: a.idAnswer
                                        }
                                    })}
                                    />

                                    {
                                        q.answers?.find((a2) => +a2?.idAnswer === q?.submission?.refIdAnswer)?.needsProof ?
                                            <UploadComponent 
                                                answerId={q.submission?.refIdAnswer} 
                                                submission={q.submission} 
                                                submissionId={q.submission?.idDealerSubmission}
                                                onReload={getData}
                                                disabled={data?.assignmentStatus === "PENDING_REVIEW"}
                                                /> :
                                         null
                                    }
                                </Card>
                            </Col>
                        );
                    }) : null
                }
            </Row>
            <Row>
                
            </Row>
        </Row>
    );
}

export default FormSubmission;