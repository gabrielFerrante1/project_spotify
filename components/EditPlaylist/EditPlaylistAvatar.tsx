import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

type Props = {
    id: string,
    setEdit: (edit: boolean) => void,
    userJwt: string
}

export default ({ id, setEdit, userJwt }: Props) => {
    const props = {
        name: 'file',
        action: `${process.env.REACT_APP_BASE_URL_API}/playlist/edit/${id}`,
        headers: {
            Authorization: `Bearer ${userJwt}`,
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