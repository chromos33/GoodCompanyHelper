import './App.css';
import Part from  './Part';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare  } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [PartList,setPartList] = useState([]);
  const [ResultRender,setResultRender] = useState(null);
  const LoadDataFromStorage = () => {
    var LocalStorageItem = localStorage.getItem('PartList');
    if(LocalStorageItem !== null)
    {
      var tmpList = JSON.parse(LocalStorageItem);
      var newPartList = tmpList.map(x => {
        x.PartList = newPartList;
        return x;
      });
      setPartList(newPartList);
    }
    
  }

  if(PartList == undefined || PartList != undefined && PartList.length == 0)
  {
    LoadDataFromStorage();
  }
  const handleAddPart = () => {
    var tmp = [];
    if(PartList != null)
    {
      tmp = PartList;
    }
    tmp.push({Name: "Partname",ManufactureParts: [],Speed: 1.0,ResultAmount:1,WantedAmount:0});
    var savearray = tmp.map(x => x);
    setPartList(savearray);
  }
  const updateLocalStorage = () => {
    console.log(PartList);
    var tmp = PartList.map(x => {
      x.PartList = [];
      return x;
    });
    localStorage.setItem("PartList",JSON.stringify(tmp));
  }
  const UpdatePartName = (value,index) => {
    var tmparray = PartList.map((part,pIndex) => {
      if(pIndex === index)
      {
        part.Name = value;
        return part;
      }
      return part;
    });
    setPartList(tmparray);
    updateLocalStorage();
  }
  const UpdateSpeed = (value,index) => {
    var tmparray = PartList.map((part,pIndex) => {
      if(pIndex === index)
      {
        part.Speed = value;
        return part;
      }
      return part;
    });
    setPartList(tmparray);
    updateLocalStorage();
  }
  const UpdateAmount = (value,index) => {
    var tmparray = PartList.map((part,pIndex) => {
      if(pIndex === index)
      {
        part.ResultAmount = value;
        return part;
      }
      return part;
    });
    setPartList(tmparray);
    updateLocalStorage();
  }
  const UpdateWantedAmount = (value,index) => {
    var tmparray = PartList.map((part,pIndex) => {
      if(pIndex === index)
      {
        part.WantedAmount = value;
        return part;
      }
      return part;
    });
    setPartList(tmparray);
    updateLocalStorage();
  }
  
  const AddSubPart = (index) => {
    var tmparray = PartList.map((part,pIndex) => {
      if(pIndex === index)
      {
        part.ManufactureParts.push({Part: "", PartSelectIndex : 0,Amount: 0});
        return part;
      }
      return part;
    });
    setPartList(tmparray);
    updateLocalStorage();
  }
  const UpdateSubPart = (data,spIndex,index) => {
    var tmparray = PartList.map((part,pIndex) => {
      if(pIndex === spIndex)
      {
        var tmpsubarray = part.ManufactureParts.map((manufacturpart,mIndex) => {
          console.log(index);
          console.log(mIndex);
          if(index === mIndex)
          {
            manufacturpart.Part = data.SelectedItem;
            manufacturpart.Amount = data.Amount;
            return manufacturpart;
          }
          return manufacturpart;
        })
        return part;
      }
      return part;
    });
    setPartList(tmparray);
    updateLocalStorage();
  }
  const DeleteSubPart = (spIndex,DIndex) => {
    var tmparray = PartList.forEach((part,pIndex) => {
      if(pIndex === spIndex)
      {
        var tmpsubarray = part.ManufactureParts.filter((manufacturpart,index) => {
          return index !== DIndex
        })
        part.ManufactureParts = tmpsubarray.map(x => x);
      }
      return part;
    });
    setPartList(tmparray);
    updateLocalStorage();
  }
  const GetPartByIndex = (Index) => {
    var Part = null;
    PartList.forEach((part,pIndex) => {
      if(pIndex === Index)
      {
        Part = part;
      }
    });
    return Part;
  } 

  const GetPartByName = (Name) => {
    var Part = null;
    PartList.forEach((part) => {
      if(Name === part.Name)
      {
        Part = part;
      }
    });
    return Part;
  }

  const GetSpeedFromPartByName = (Name) => {
    var Part = GetPartByName(Name);
    return Part.Speed;
  }
  const GetResultAmountFromPartByName = (Name) => {
    var Part = GetPartByName(Name);
    return Part.ResultAmount;
  }
  const GetManufacturePartsByName = (Name) => {
    var Part = GetPartByName(Name);
    return Part.ManufactureParts;
  }
  const Calculate = (Index) => {
    var PartDesks = [];
    var part = GetPartByIndex(Index);
    var Result = CalculatePart(part,part.WantedAmount);
    var ResultArray = [];
    for(const [key,value] of Object.entries(Result))
    {
      ResultArray.push({Name: key,Value:value});
    }
    var ResultRenderContent = ResultArray.map((item,index) => {
      return <span key={index}>{item.Name}: {Math.ceil(item.Value)} "Desks"</span>;
    });
    setResultRender(
      <div className="Result">
        {ResultRenderContent}
        <span className="button button_big bg_grey mt_10" onClick={() => {setResultRender(null)}}>Close</span>
      </div>
    );
    

  }
  const AddDeskDataToObject = (object,PartName,Deskamount) => {
    var exists = false;
    for(const [key,value] of Object.entries(object))
    {
      if(key === PartName)
      {
        object[key] += Deskamount;
        exists = true;
      }
    }
    if(!exists)
    {
      object[PartName] = Deskamount;
    }
    return object;
  }
  const IsKeyInObject = (searchkey,object) => {
    for(const [key,value] of Object.entries(object))
    {
      if(key === searchkey)
      {
        return true;
      }
    }
    return false;
  }
  const MergeDeskDataObjects = (A,B) => {
    for(const [key,value] of Object.entries(B))
    {
      if(IsKeyInObject(key,A))
      {
        //Increment by value
        console.log("Increment");
        A[key] += value;
      }
      else
      {
        //Add
        A[key] = value;
      }
    }
    return A;
  }
  const CalculatePart = (Part,WantedAmount) => {
    var Data = {};
    if(Part.ManufactureParts.length > 0)
    {
      Part.ManufactureParts.forEach(x => {
        var Speed = GetSpeedFromPartByName(x.Part);
        var ResultAmount = GetResultAmountFromPartByName(x.Part);
        var DeskCount = CalculateRequiredDeskCount(WantedAmount,Speed,ResultAmount)
        Data = AddDeskDataToObject(Data,x.Part,DeskCount);
        var ManufactureParts = GetManufacturePartsByName(x.Part);
        if(ManufactureParts.length > 0)
        {
          ManufactureParts.forEach(SubPart => {
            
            var tmp = GetPartByName(SubPart.Part);
            var tmpData = CalculatePart(tmp,DeskCount * SubPart.Amount);
            Data = MergeDeskDataObjects(Data,tmpData);
          });
        }
      });
    }
    else
    {
      var Deskcount = CalculateRequiredDeskCount(WantedAmount,Part.Speed,Part.ResultAmount);
      Data = AddDeskDataToObject(Data,Part.Name,Deskcount);
    }
    
    return Data;
  }
  const CalculateRequiredDeskCount = (WantedAmount,Speed,ResultAmount) => {
    var value =  WantedAmount / ((1 / Speed) * ResultAmount);
    return value;
  }
  

  if(PartList != undefined && PartList.length > 0)
  {
    var PartsListRender = PartList.map((part,index) => {
      return (<Part PartList={PartList} key={index} index={index} data={part} 
      handlePartNameChange={(value) => {
        UpdatePartName(value,index);
      }}
      handleSpeedChange={(value) => {
        UpdateSpeed(value,index);
      }}
      handleAmountChange={(value) => {
        UpdateAmount(value,index);
      }}
      handleWantedAmountChange={(value) => {
        UpdateWantedAmount(value,index)
      }}
      handleAddSubPart = {() => {
        AddSubPart(index);
      }}
      handleUpdateSubPart = {(data,Sindex) => {
        UpdateSubPart(data,index,Sindex);
      }}
      handleDeleteSubPart = {(DIndex) => {
        DeleteSubPart(index,DIndex);
      }}
      handleCalculate = {() => {
        Calculate(index);
      }}
       />);
    });
    return (<div className="App">
        {ResultRender}
        <span className="button" onClick={handleAddPart}><FontAwesomeIcon icon={faPlusSquare}/></span>
        <div className="addedParts">
          <h2>Parts</h2>
          <div className="PartsList">
            {PartsListRender}
          </div>
        </div>
      </div>
    );
  }
  else{
    
    return (<div className="App">
        <span className="button" onClick={handleAddPart}><FontAwesomeIcon icon={faPlusSquare}/></span>
      </div>
    );
  }
 
}

export default App;
