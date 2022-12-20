import { Col, Result, Row } from "antd";
import { useState } from "react";
import { useGetDealerLazyQuery, useGetDealerQuery } from "../../gql/generated/query.graphql";
import storeService from "../../utils/helpers/store";
import { LOCAL_STORAGE_KEYS } from "../../utils/helpers/constants";
import { useAuthContext } from "../../utils/context";

const Home = (props: any) => {
    const [data, setData] = useState<any>(null);

    const authContext = useAuthContext();

    const { loading } = useGetDealerQuery({
        context: {
            headers: {
                Authorization: `Bearer ${authContext.token}`
            }
        },
        onCompleted: (d) => {
            console.log(d);
        },
        onError: (d) => {
            console.log(authContext.token);
            console.log(d);
        }
    });
    
    return (
        <Row style={{ width: "100%" }} justify={"center"} align={"middle"}>
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
                null
                : null
            }
        </Row>
    );
}

export default Home;