import Interpreter from '@/interpreter';

const Content = props => {
    const {content, selected, setSelected} = props;

    return <Interpreter isBuilder={false} content={content} selected={selected} setSelected={setSelected} />;
};

export default Content;
