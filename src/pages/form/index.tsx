import React, { useEffect, useState } from "react";
import { Button, Card, Col, Divider, Input, Row, Select, Typography, Upload } from "antd";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../utils/context";
import { Assignment, useGetAssignmentLazyQuery, useSaveAssignmentAnswersMutation } from "../../gql/generated/query.graphql";
import UploadComponent from "../../components/UploadComponent";


const FormSubmission = (props: any) => {

    const [data, setData] = useState<Partial<Assignment> | undefined>(undefined);

    const params = useParams();
    const authCtx = useAuthContext();

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

    return (
        <Row style={{ width: "100%" }}>
            <Row style={{ width: "100%" }} justify="start" wrap>
                <Col span={8}>sdf</Col>
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
                                            <UploadComponent answerId={q.submission?.refIdAnswer} /> :
                                         null
                                    }
                                </Card>
                            </Col>
                        );
                    }) : null
                }
            </Row>
        </Row>
    );
}

export default FormSubmission;