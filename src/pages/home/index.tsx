import { Card, Col, Result, Row, Statistic, Tag } from "antd";
import { useState } from "react";
import { Assignment, useGetDealerQuery } from "../../gql/generated/query.graphql";
import { useAuthContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { SyncOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
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

    const getTag = (d: any) => {
        switch(d?.assignmentStatus) {
            case 'PENDING_REVIEW':
            return    <Tag icon={<SyncOutlined spin />} color="processing">
                        Pending Review
                </Tag>;
            case 'CREATED':
                return <Tag icon={<ClockCircleOutlined />} color="default">
                Created
              </Tag>;
            case 'APPROVED':
                return <Tag icon={<CheckCircleOutlined />} color="success">
                success
              </Tag>;
            default:
                return null
        }
    }
    
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
                <Card hoverable>
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
                            onClick={() => navigate(`form/${i.idAssignment}`)}
                            title={i.form?.formTitle}
                            hoverable
                            >
                            
                            {/* <Statistic 
                                title={i.form?.formTitle}
                                value={i.assignmentStatus}
                                style={{ minWidth: 100 }}
                            /> */}
                            {getTag(i)}
                        </Card>
                    );
                })
            }
        </Row>
    );
}

export default Home;