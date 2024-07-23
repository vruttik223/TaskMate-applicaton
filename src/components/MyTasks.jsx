import React, { useEffect, useState } from 'react';

function MyTasks() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");


  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch( "https://github.com/vruttik223/TaskMate-applicaton/blob/main/src/utils/data.json/data/").then((result) => {
      result.json().then((res) => {
        setData(res);
      });
    });
  }

  function submitTask() {
    let taskInfo = { title, description, dueDate, priority };

    fetch( "https://github.com/vruttik223/TaskMate-applicaton/blob/main/src/utils/data.json/data/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskInfo)
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        getData();
        clearForm();
      });
    });
  }

  function clearForm() {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
  }

  function deleteTask(id) {
    fetch(`https://github.com/vruttik223/TaskMate-applicaton/blob/main/src/utils/data.json/data/${id}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        getData();
      });
    });
  }

  function getDetails(id) {
    let filteredData = data.filter((val) => {
      return val.id === id;
    });

    let task = filteredData[0];
    setId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
  }

  function updateTask() {
    let updatedTask = { title, description, dueDate, priority, id };
    fetch(`https://github.com/vruttik223/TaskMate-applicaton/blob/main/src/utils/data.json/data/${id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask)
    }).then((result) => {
      result.json().then((res) => {
        getData();
        clearForm();
      });
    });
  }

  return (
    <div className=" bg-aqua-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-white bg-blue-500">TaskMate</h1>
      <div className="p-6 max-w-full mx-auto flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold mb-4">Task List</h1>
          {data.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((val) => (
                <div key={val.id} className="p-4 border rounded shadow-md ">
                  <h2 className="text-xl font-semibold">{val.title}</h2>
                  <p className="text-gray-600">{val.description}</p>
                  <p>Due Date: {val.dueDate}</p>
                  <p>Priority: {val.priority}</p>
                  <button
                    onClick={() => { deleteTask(val.id); }}
                    className="bg-red-500 text-white px-2 py-1 mt-2 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => { getDetails(val.id); }}
                    className="bg-blue-500 text-white px-2 py-1 mt-2 ml-2 rounded hover:bg-blue-600 text-sm"
                  >
                    Update
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>Tasks not found</div>
          )}
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="bg-aqua-300 p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">Task Form</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); }}
              placeholder="Title"
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => { setDescription(e.target.value); }}
              placeholder="Description"
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => { setDueDate(e.target.value); }}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              value={priority}
              onChange={(e) => { setPriority(e.target.value); }}
              placeholder="Priority"
              className="border p-2 rounded w-full mb-2"
            />
           

            <div className="flex justify-end">
              <button
                onClick={submitTask}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm font-bold mr-2"
              >
                Submit
              </button>
              <button
                onClick={updateTask}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm font-bold"
              >
                Update
              </button>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <p className="font-semibold mb-1">TaskMate</p>
            <ul className="list-disc pl-4">
              <li>Add New Task: Fill out the form on the right with task details.</li>
              <li>Submit Task: Click "Submit" to add the task.</li>
              <li>Update Task: Click "Get Details," update the form, then click "Update" to modify a task.</li>
              <li>View Tasks: Tasks are listed on the left.</li>
              <li>Task Details: Click "Get Details" for more info.</li>
              <li>Delete Task: Click "Delete" to remove a task.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTasks;
