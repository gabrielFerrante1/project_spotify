import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

type Props = {
    id: string,
    setEdit: (edit: boolean) => void,
}

export default ({ id, setEdit }: Props) => {
    const props = {
        name: 'file',
        action: `${process.env.REACT_APP_BASE_URL_API}/playlist/edit/${id}`,
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I',
        }
    };

    return (
        <Upload
            onChange={(info: any) => {
                if (info.file.status === 'done') {
                    if (info.file.response.error != '') {
                        message.error(info.file.response.error);
                    } else {
                        setEdit(false);
                        message.success(`${info.file.name} imagem carregada com sucesso`);
                        setEdit(true);
                    }
                }
            }}
            {...props}
            showUploadList={false}
        >
            <Button
                icon={<UploadOutlined />}
            >
                Alterar imagem
            </Button>
        </Upload>
    )
}