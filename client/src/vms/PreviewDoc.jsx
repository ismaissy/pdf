import 'bootstrap/dist/css/bootstrap.min.css';

const PreviewDocWrapper = ({ ...props }) => {
    const styles = {
        display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '16px',
        alignItems: 'center', padding: '10px', overflowX: 'auto', whiteSpace: 'nowrap'
    };

    return (
        <>
            <div style={styles}>
                <span>id</span>
                <span>title</span>
                <span>content</span>
            </div>
            <div>{props.children}</div>
        </>
    )
}

export default PreviewDocWrapper;