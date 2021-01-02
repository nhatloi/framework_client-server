import React from 'react'
import { Result, Button } from 'antd';
import { useParams } from 'react-router-dom';


function Successfully() {
    const {title,subTitle} = useParams();
    return (
        <div>
            <Result
                status="success"
                title={title}
                subTitle={subTitle}
                extra={[
                    <a href='http://gmail.com/'>
                        <Button type="primary" key="console">
                            {
                                title === 'Sign Up Success!' ?
                                <div>Go Email</div>
                                :''
                            }
                            
                        </Button>
                    </a>
                ,
                <a href='/login'>
                    <Button type="primary" key="console">
                        Login?
                    </Button>
                </a>
                ]}
            />
        </div>
    )
}

export default Successfully
