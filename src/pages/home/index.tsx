import { Card, Col, Result, Row, Statistic } from "antd";
import { useState } from "react";
import { Assignment, useGetDealerQuery } from "../../gql/generated/query.graphql";
import { useAuthContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";

const Home = (props: any) => {
    const [data, setData] = useState<Partial<Assignment>[]>([]);

    const authContext = useAuthContext();
    const navigate = useNavigate();

    const { loading } = useGetDealerQuery({
        context: {
            headers: {
                Authorization: `Bearer ${authContext.token}`
            }
        },
        fetchPolicy: "no-cache",
        onCompleted: (d) => {
            const dd:any = d?.getDealer?.dealer?.assignment;
            if (dd) {
                setData(dd);
            }
        },
        onError: (d) => {
            console.log(authContext.token);
            console.log(d);
        }
    });
    
    return (
        <Row style={{ width: "100%" }} justify={"start"} align={"top"}>
            {
                !data ?
                <Col span={12} md={12} xs={12} lg={12}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, your are not assigned to any page."
                    // extra={<Button type="primary">Back Home</Button>}
                />
                </Col> :
                loading ?
                <Card>
                    <Statistic 
                        // title={i.form?.formTitle}
                        // value={i.assignmentStatus}
                        loading={true}
                        style={{ minWidth: 100}}
                    />
                </Card>
                :
                data.map(i => {
                    return (
                        <Card 
                            key={`key-card-item-page-listing-${i.idAssignment}`} 
                            style={{ cursor: "pointer", marginRight: 15 }} 
                            onClick={() => navigate(`form/${i.idAssignment}`)}>
                            <Statistic 
                                title={i.form?.formTitle}
                                value={i.assignmentStatus}
                                style={{ minWidth: 100 }}
                            />
                        </Card>
                    );
                })
            }
        </Row>
    );
}

export default Home;