import { Popover } from 'antd';
import { Typography } from 'antd';
import { ReactElement } from 'react';

//Types desse componente
type Props = {
    children: ReactElement,
    title: any
}

const { Title } = Typography;
 

export const PopoverGrf = ({children, title}: Props) => { 
    return (
        <Popover  
            content={() => (
                <Title style={{margin:'0',padding:0}} level={5}>
                    {title}
                </Title> 
            )}
        >

            {children}
        </Popover>
    )
}