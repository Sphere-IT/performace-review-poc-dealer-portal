import { Button, Divider, Upload, UploadFile, UploadProps } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

const UploadComponent = (props: any) => {

    const [fileList, setFileList] = useState<UploadFile[]>([])

    useEffect(() => {
        console.log(props);
    }, []);

    // const uploadP: UploadProps = {
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     onChange({ file, fileList }) {
    //       if (file.status !== 'uploading') {
    //         console.log(file, fileList);
    //       }
    //     },
    //   };

    const handleUpload = async ({ file, fileList }: any) => {
        try {
            
        } catch (err) {
            
        }
    }

    return (
        <>
        <Divider />
        <Upload 
            multiple={true} 
            fileList={fileList}
            onChange={(e) => console.log(e)}
            >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> 
        </>
    );
}

export default UploadComponent