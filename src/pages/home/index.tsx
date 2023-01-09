import { Card, Col, Result, Row, Statistic, Tag, Tour, TourProps } from "antd";
import { useRef, useState } from "react";
import { Assignment, useGetDealerQuery } from "../../gql/generated/query.graphql";
import { useAuthContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { SyncOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Home = (props: any) => {
    const [data, setData] = useState<Partial<Assignment>[]>([]);
    const [tourOpen, setTourOpen] = useState(false);

    const cardRef = useRef(null);
    const homeRef = useRef(null);
    const statusRef = useRef(null);

    const tourData: TourProps['steps'] = [
        {
            title: 'Dashboard',
            description: 'This is your dashboard, here you can see all your assignments.',
            target: () => homeRef.current,
          },
        {
            title: 'Assignment',
            description: 'Click on this card to start your assignment',
            target: () => cardRef.current,
            placement: "right"
        },
        {
            title: "Assignment status",
            description: `Here you can check your assignment status, it can either be \n - Created (you are currently working on it) \n - Pending review (our team is looking at your submission) \n - Completed (submitted and scored by our team)`,
            target: () => statusRef.current,
            placement: 'right'
        }
    ]

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
                checkToOpenTour();
            }
        },
        onError: (d) => {
            console.log(authContext.token);
            console.log(d);
        }
    });

    const checkToOpenTour = () => {
        const touredHome = localStorage.getItem("toured_home");
        if (touredHome) return;
        setTourOpen(true);
    }

    const completeTour = () => {
        localStorage.setItem("toured_home", 'true');
        setTourOpen(false);
    }

    const getTagWithRef = (d: any) => {
        switch(d?.assignmentStatus) {
            case 'PENDING_REVIEW':
            return    <Tag ref={statusRef} icon={<SyncOutlined spin />} color="processing">
                        Pending Review
                </Tag>;
            case 'CREATED':
                return <Tag ref={statusRef} icon={<ClockCircleOutlined />} color="default">
                Created
              </Tag>;
            case 'COMPLETED':
                return <Tag ref={statusRef} icon={<CheckCircleOutlined />} color="success">
                completed
              </Tag>;
            default:
                return null
        }
    }
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
            case 'COMPLETED':
                return <Tag icon={<CheckCircleOutlined />} color="success">
                completed
              </Tag>;
            default:
                return null
        }
    }
    
    return (
        <Row style={{ width: "100%" }} justify={"start"} align={"top"} ref={homeRef}>
            <Tour open={tourOpen} onClose={completeTour} steps={tourData} />

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
                data.map((i, index) => {
                    if (index === 0) {
                        return (
                            <Card 
                                key={`key-card-item-page-listing-${i.idAssignment}`} 
                                style={{ cursor: "pointer", marginRight: 15 }} 
                                onClick={() => navigate(`form/${i.idAssignment}`)}
                                title={i.form?.formTitle}
                                hoverable
                                ref={cardRef}
                                >
                                
                                {/* <Statistic 
                                    title={i.form?.formTitle}
                                    value={i.assignmentStatus}
                                    style={{ minWidth: 100 }}
                                /> */}
                                {getTagWithRef(i)}
                            </Card>
                        );
                    }
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