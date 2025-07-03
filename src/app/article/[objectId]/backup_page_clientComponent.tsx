"use client"
import { apiCall } from '@/helper/apiCall';
import * as React from 'react';

interface IArticleDetailPageProps {
    params: { title: string };
}



const ArticleDetailPage: React.FunctionComponent<IArticleDetailPageProps> = (props) => {

    const [detail, setDetail] = React.useState<any>(null)

    const getDetail = async () => {


        try {
            const res = await apiCall.get(`/articles?where=%60title%60%20%3D%20'${props.params.title}'`)

            console.log(res.data)
            setDetail(res.data[0])
        } catch (error) {
            console.log(error)
        }



    }

    React.useEffect(() => {

        getDetail();

    }, []);

    return <div>
        <h1 className='text-5xl'>{detail?.title}</h1>
        {/* <img src="" alt="" /> */}
    </div>
};

export default ArticleDetailPage;

