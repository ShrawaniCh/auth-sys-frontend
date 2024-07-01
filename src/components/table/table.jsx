// src/TableComponent.js
import React from 'react';
import './table.scss';

const TableComponent = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{new Date(item.dob).toLocaleDateString()}</td>
              <td>{item.email}</td>
              <td className='action_holder'>
                <button>Edit</button>
                <button style={{background :"red"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
