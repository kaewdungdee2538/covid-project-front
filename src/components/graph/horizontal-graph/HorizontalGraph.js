import './HorizontalGraph.css'
function HorizontalGraph(props){
    const {textInput,widthInput,colorInput} = props;

    return (
        <div 
        className="horizontal-graph"
        style={{
            width: widthInput,backgroundColor: colorInput
          }}
        >
            <p>{textInput}</p>
        </div>
    );
}
export default HorizontalGraph;