import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export function DeletecolourGroup() {
  const [colourGroups, setColourGroups] = useState(null);
  const [toBeDeletedColourGroupId, setToBeDeletedColourGroupId] =
    useState(null);

  let history = useHistory();

  useEffect(() => {
    fetch(`/colour_groups`)
      .then((res) => res.json())
      .then((serverResponse) =>
        setColourGroups(serverResponse.colourGroups)
      );
  }, []);

  const deletecolourGroup = (colourGroupId) => {
    fetch(`/colour_groups/${colourGroupId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => history.push(`/`));
  };

  const DeleteColourGroupForm = ()=> {
    return(
      <form
      onSubmit={(e) => {
        e.preventDefault();
        deletecolourGroup(toBeDeletedColourGroupId);
      }}
    >
      <select
        onChange={(e) => setToBeDeletedColourGroupId(e.target.value)}
      >
        <option>--- Choose group to delete ---</option>

        {colourGroups.map((colourGroup, index) => {
          return (
            <option key={index} value={colourGroup.id}>
              {colourGroup.name}
            </option>
          );
        })}
        
      </select>
      <button>Delete colour group</button>
    </form>
    );
  }
  return (
    <div className="delete-colour-group-page">
      <h1>Delete Colour Group</h1>
      {colourGroups && <DeleteColourGroupForm />}
    </div>
  );
}
