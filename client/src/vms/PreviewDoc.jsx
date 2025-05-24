import 'bootstrap/dist/css/bootstrap.min.css';

const PreviewDocWrapper = ({ ...props }) => {
    const styles = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '16px',
        alignItems: 'center',
        padding: '10px',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
    };

    return (
        <>
            <div style={styles}>
                <span>{props?.id || ''} </span>
                <span>{props?.title || ''} </span>
                <span>{props?.content || ''} </span>
            </div>
            <div>{props.children}</div>
        </>
    )
}

export default PreviewDocWrapper;