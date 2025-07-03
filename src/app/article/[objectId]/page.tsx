
import { apiCall } from '@/helper/apiCall';
import * as React from 'react';
import parse from 'html-react-parser'

interface IArticleDetailPageProps {
    params: { objectId: any };
}

const getDetail = async (objectId:any) => {

    try{

        const res = await apiCall.get(`/articles/${objectId}`)

        console.log(res.data);
        console.log("Test");

        return res.data;

    } catch (error) {
        console.log(error)
    }

}

const ArticleDetailPage: React.FunctionComponent<IArticleDetailPageProps> = async (props) => {

    // console.log(props.params.objectId)

 const detailData = await getDetail(props.params.objectId);

    return <div>
        <section className='flex flex-col items-center mt-3'>
        <div className='h-fit p-2 px-4 rounded-4xl bg-gray-100 mb-5'>
        <h2 className=' text-sm w'>{detailData?.category}</h2>
        </div>
        <h1 className='text-5xl mb-20 font-bold text-center' >{detailData?.title}</h1>
        <img src={detailData?.thumbnail} alt="" className='object-cover object-center h-full w-[50%] min-w-[600px] rounded-3xl '  />
        <div className='mt-20 marginParagraph w-full max-w-[800px]'>{parse(detailData?.content)}</div>
        </section>
    </div>
};

export default ArticleDetailPage;




