import './App.css';
import SubPart from './SubPart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
function Part(props) {
    const handleNameChange = (e) => {
        props.handlePartNameChange(e.target.value);
    }
    const handleSpeedChange = (e) => {
        props.handleSpeedChange(e.target.value);
    }
    const handleAmountChange = (e) => {
        props.handleAmountChange(e.target.value);
    }
    const handleWantedAmountChange = (e) => {
        props.handleWantedAmountChange(e.target.value);
    }
    const handleAddPart = (e) => {
        props.handleAddSubPart();
    }
    var RenderedPartList = null;
    if (props.PartList.length > 1) {
        var ManufacturePartsList = props.data.ManufactureParts.map((part, index) => {
            var ValidSubParts = [];
            var ExistingSubParts = [];
            //TODO redo and integrate not allowing already added subparts
            props.PartList.forEach(x => {
                var alreadyexists = false;
                props.data.ManufactureParts.some(checkpart => {
                    if(checkpart.Part === x.Name)
                    {
                        ExistingSubParts.push(x);
                        return true;
                    }
                    return false;
                });
                if (x.Name !== props.data.Name) {
                    ValidSubParts.push(x);
                }
            });
            return <SubPart key={index} ExistingSubParts={ExistingSubParts} ValidSubParts={ValidSubParts} Amount={part.Amount} SelectedItem={part.Part} 
                handleSave={(e) => {
                    props.handleUpdateSubPart(e,index);
                }}
                handleDelete={() => {
                    props.handleDeleteSubPart(index);
                }}
            />
        })
        RenderedPartList = (<div className="PartList">
            <div>
                <h5>Components/Modules</h5>
                {ManufacturePartsList}
                <span className="button bg_grey fullWidth text-center" onClick={handleAddPart}><FontAwesomeIcon icon={faPlusSquare} /></span>
            </div>
        </div>);
    }

    return (
        <div className="card">
            <input value={props.data.Name} onChange={handleNameChange} type="text" />
            <div>
                <input onChange={handleSpeedChange} value={props.data.Speed} step="0.01" min="0.01" type="number" name="Speed" />
                <label htmlFor="Speed">Speed</label>
                <br />
                <input onChange={handleAmountChange} value={props.data.ResultAmount} type="number" min="1" name="Amount" />
                <label htmlFor="Amount">Resulting Amount</label>
            </div>
            {RenderedPartList}
            <div className="bg_grey mb_10 mt_10">
                <input onChange={handleWantedAmountChange} value={props.data.WantedAmount} type="number" min="1" name="WantedAmount" />
                <label htmlFor="WantedAmount">Wanted Amount</label>
            </div>
            <span className="button bg_grey fullWidth text-center" onClick={x => {props.handleCalculate()}}>Calculate</span>
        </div>
    );
}
export default Part;