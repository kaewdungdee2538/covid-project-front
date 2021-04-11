import './DateLabelComponent.css'
function DateLabelComponent(props){
    const {inputText} = props
    return (
        <div className="date-label-form" key={Date.now.toString()}>
            <p>
                Date : {inputText}
            </p>
        </div>
    );
}
export default DateLabelComponent;