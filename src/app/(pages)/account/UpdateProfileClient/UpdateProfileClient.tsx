'use client'
// ./FakeEstate/src/app/_components/UpdateProfileClient.tsx
import React, { useState } from 'react';
import { Button } from '../../../../app/_components/Button'
import UpdateForm from '../UpdateData/update';


type UpdateProfileClientProps = {
    initialData: any;
  };
  
  const UpdateProfileClient: React.FC<UpdateProfileClientProps> = ({ initialData }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
  
    const handleEditProfileClick = () => {
      setShowUpdateForm(!showUpdateForm);
    };
    const handleFormSuccess = () => {
      setShowUpdateForm(false); // Hide the form after successful update
      // Optionally, you can refresh the page here if needed
    };
    return (
      <div>
        <Button label="Edit Profile" onClick={handleEditProfileClick} appearance="primary" />
        {showUpdateForm && <UpdateForm initialData={initialData} onSuccess={handleFormSuccess} />}
      </div>
    );
  };
  
  export default UpdateProfileClient;