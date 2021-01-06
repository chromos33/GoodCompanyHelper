import './App.css';
import {useState} from 'react';
function SubPart(props) {
    const [SelectedItem,setSelectedItem] = useState(props.SelectedItem);
    const [RequiredAmount,setRequiredAmount] = useState(props.Amount);
    //TODO: only show options that are not yet added or is currently selected
    const OptionExistsAlready = (Name) => {

    }
    var Options = props.ValidSubParts.map((value, index) => {
        return <option key={index} value={value.Name}>{value.Name}</option>
    });
    var DefaultOption = (<option value="" disabled>Select one</option>);
    const handleDelete = () => {
        props.handleDelete();
    }
    const handleSave = () => {
        if(SelectedItem != "" && RequiredAmount > 0)
        {
            props.handleSave({SelectedItem: SelectedItem,Amount: RequiredAmount});
        }
    }
    return (
        <div className="subpart bg_grey">
            <select value={SelectedItem} onChange={(e) => {setSelectedItem(e.target.value)}}>
                {DefaultOption}
                {Options}
            </select>
            <input type="number" min="1" value={RequiredAmount} step="1"  onChange={(e) => {setRequiredAmount(e.target.value)}}/>
            <div>
                <span onClick={handleDelete} className="button half-width text-center">Delete</span>
                <span onClick={handleSave} className="button half-width text-center">Save</span>
            </div>
        </div>
    );
}
export default SubPart;