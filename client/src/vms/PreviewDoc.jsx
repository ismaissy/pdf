const PreviewDocWrapper = ({...props}) => {
    
    return (
        <div className="d-flex flex-column">
            <span>id</span>
            <span>title</span>
            <span>content</span>
            {props.children}
        </div>
    )
}

export default PreviewDocWrapper;