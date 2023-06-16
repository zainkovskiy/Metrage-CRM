import React, { useState } from 'react';
import UserFinder from 'components/Main/UserFinder';
import DialogWindow from 'components/Main/DialogWindow';
const FieldNew = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      new chat
      <button onClick={() => setOpen(!open)}>add user</button>
      <DialogWindow onClose={() => setOpen(!open)} open={open}>
        <UserFinder />
      </DialogWindow>
    </div>
  );
};

export default FieldNew;