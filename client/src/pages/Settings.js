import React from 'react';
import PageContainer from '../components/PageContainer.js';
import SettingsCard from '../components/SettingsCard.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useAuth from '../lib/auth/useAuth.js';
import DeleteUserModal from '../components/DeleteUserModal.js'
import { useDisclosure } from '@chakra-ui/react';

const Settings = () => {
  const { user } = useAuth();
  const {
    isOpen: isDeleteUserModalOpen,
    onOpen: onDeleteUserModalOpen,
    onClose: onDeleteUserModalClose
  } = useDisclosure();

  useDocumentTitle('Settings | HeadyNet');

  return (
    <>
      <PageContainer>
        <SettingsCard onShowDeleteAccountModal={onDeleteUserModalOpen}/>
      </PageContainer>
      <DeleteUserModal
        isOpen={isDeleteUserModalOpen}
        user={user}
        onClose={onDeleteUserModalClose}
      />
    </>
  );
}

export default Settings;
