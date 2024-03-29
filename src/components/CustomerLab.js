import React, { useState } from 'react';
import './CustomerLab.css';

function CustomerLab() {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchemaOptions, setNewSchemaOptions] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newSchemaDropdowns, setNewSchemaDropdowns] = useState([]);

  const handleAddNewSchema = () => {
    if (selectedSchema) {
      const newSchema = { [selectedSchema]: selectedSchema };
      setSelectedSchemas([...selectedSchemas, newSchema]);
      setNewSchemaOptions(newSchemaOptions.filter(schema => schema.value !== selectedSchema));
      setSelectedSchema('');
      setNewSchemaDropdowns([...newSchemaDropdowns, newSchema]);
    }
  };
  const handleSaveSegment = () => {
    setShowPopup(false);
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => schema)
    };
    // Send data to server
    console.log(data);
    // Reset segmentName and selectedSchemas
    setSegmentName('');
    setSelectedSchemas([]);
    setNewSchemaDropdowns([]);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="header">Save Segment</h1>
        <button className="save-segment-button" onClick={() => setShowPopup(true)}>Save Segment</button>
        {showPopup && (
          <div className="popup">
            <input
              className="segment-name-input"
              type="text"
              placeholder="Enter Segment Name"
              value={segmentName}
              onChange={e => setSegmentName(e.target.value)}
            />
            <label className="schema-label">Add Schema to Segment:</label>
            <select
              className="schema-select"
              value={selectedSchema}
              onChange={e => setSelectedSchema(e.target.value)}
            >
              <option value="">Select</option>
              {newSchemaOptions.map(schema => (
                <option key={schema.value} value={schema.value}>{schema.label}</option>
              ))}
            </select>
            <button className="add-schema-button" onClick={handleAddNewSchema}>+ Add Schema</button>
            <button className="save-segment-button" onClick={handleSaveSegment}>Save Segment</button>
          </div>
        )}
        <div className="blue-box">
          {selectedSchemas.map((schema, index) => (
            <div key={index} className="schema-item">
              <label>{Object.keys(schema)[0]}</label>
              <select>
                {newSchemaOptions.map(schema => (
                  <option key={schema.value} value={schema.value}>{schema.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <h3>You Can View save segement in the Log</h3>
      </div>
    </div>
  );
}

export default CustomerLab;
