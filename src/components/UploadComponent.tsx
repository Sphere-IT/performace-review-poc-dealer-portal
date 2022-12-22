import { Button, Divider, Upload, UploadFile, message } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useDeleteUserProofFileMutation, useGetDealerUploadUrlLazyQuery, useSaveUserProofFileMutation } from "../gql/generated/query.graphql";
import { useAuthContext } from "../utils/context";
import axios from "axios";
import { UploadChangeParam } from "antd/es/upload";

const UploadComponent = (props: any) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const authCtx = useAuthContext();

    useEffect(() => {
        // console.log(props?.submission?.userProof)
        setFileList([]);
        if (props?.submission?.userProof?.length) {
            const arr: UploadFile[] = [];
            props.submission.userProof.forEach((i: any) => {
                // alert("hellos")
                arr.push({
                    uid: i.fileKey,
                    name: i.fileKey,
                    status: "done",
                    // url: "ddd",
                })
            });
            setFileList(arr);
            // console.log(arr, fileList)
        }
    }, [props, props?.submission?.userProof]);

    const [getUploadLink] = useGetDealerUploadUrlLazyQuery({
        context: {
            headers: {
                authorization: `Bearer ${authCtx.token}`
            }
        },
        fetchPolicy: "no-cache"
    });

    const [saveUserProof] = useSaveUserProofFileMutation({
        context: {
            headers: {
                authorization: `Bearer ${authCtx.token}`
            }
        },
        fetchPolicy: "no-cache"
    });

    const [deleteUserProof] = useDeleteUserProofFileMutation({
        context: {
            headers: {
                authorization: `Bearer ${authCtx.token}`
            }
        },
        fetchPolicy: "no-cache"
    })

    const addFileToSubmission = (key: string) => {
        saveUserProof({
            variables: {
                fileKey: key,
                submissionId: +props.submissionId
            },
            onCompleted: (d) => props.onReload(),
        })
    }

    const handleUpload = async ({ file, fileList, ...rest}: UploadChangeParam) => {
        console.log("On change event", file, fileList, rest);
        if (file?.status === "removed") return;
        getUploadLink({
            onCompleted: async (res) => {
                if (res?.getDealerUploadUrl?.signedUrl) {
                    let url = res.getDealerUploadUrl.signedUrl;
                    let key = res.getDealerUploadUrl.fileName;
                    try {
                        addFile(key);
                        await axios.put(url, file.originFileObj);
                        addFileToSubmission(key)
                    } catch (err: any) {
                        messageApi.error(err?.message || err, 3000);
                        updateFileState(key, "error")
                    }
                }
            },
            onError: (e) => messageApi.error(e?.message, 3000)
        })
    }

    const addFile = (key: string) => {
        let s = [...fileList];
        s.push({
            uid: key,
            name: key,
            status: "uploading",
        })
        setFileList(s);
    }

    const updateFileState = (key: string, newState: string) => {
        let index = 0;
        let f = fileList.find((i, fileI) => {
            if (i.uid === key){
                index = fileI;
                return true;
            }
            return false
        });
        console.log(f, index)
    }

    
    const handleRemove = (uploadFile: UploadFile) => {
        deleteUserProof({
            variables: {
                fileKey: uploadFile.uid
            },
            onCompleted: (d) => props.onReload(),
            onError: (e) => messageApi.error(e?.message, 3000)
        })
    }


    return (
        <>
        {contextHolder}
        <Divider />
        <Upload 
            customRequest={() => {}}
            multiple={true} 
            fileList={fileList}
            onChange={handleUpload}
            onRemove={handleRemove}
            disabled={props.disabled}
            >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> 
        </>
    );
}

export default UploadComponent