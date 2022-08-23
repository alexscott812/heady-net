import React from 'react';
import { Button, Text, Stack, Avatar, VStack } from '@chakra-ui/react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { FaPen, FaKey, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../lib/auth';
import getRelativeTime from '../utils/get-relative-time.js'

const UserHeader = ({
  user = null,
  onShowEditUserButtonClick = null,
  onShowChangePasswordButtonClick = null,
  onShowDeleteUserButtonClick = null
}) => {
  const { user: currentUser, logout } = useAuth();

  const handleLogout = async () => {
    logout.mutate({
      opts: {
        returnTo: '/'
      }
    });
  };

  return (
    <Card>
      <CardBody>
        <VStack align="start" spacing={0}>
          <Avatar size="lg" name={`${user.first_name} ${user.last_name}`} mb={3} />
          <CardTitle mb={0}>
            {(user._id === currentUser?._id)
              ? `${user.first_name} ${user.last_name} (you)`
              : `${user.first_name} ${user.last_name.charAt(0)}.`
            }
          </CardTitle>
          <Text variant="secondary">{`Joined ${getRelativeTime(user.created_at)}`}</Text>
          <Text variant="secondary">{`${user.review_count} show reviews`}</Text>
        </VStack>
        {/* <Stack direction={'row'} mb={3}>
          <Avatar name={`${user.first_name} ${user.last_name}`} />
          <Stack direction={'column'} spacing={0}>
            <CardTitle fontWeight={'semibold'} mb={0}>
              {(user._id === currentUser?._id)
                ? `${user.first_name} ${user.last_name} (you)`
                : `${user.first_name} ${user.last_name.charAt(0)}.`
              }
            </CardTitle>
            <Text variant='secondary'>{`Joined: ${getRelativeTime(user.created_at)}`}</Text>
          </Stack>
        </Stack> */}
        {(user._id === currentUser?._id) && (
          <Stack direction="column" mt={3}>
            <Button
              variant="solid"
              colorScheme="gray"
              onClick={onShowEditUserButtonClick}
              leftIcon={<FaPen />}
            >
              Edit Info
            </Button>
            <Button
              variant="solid"
              colorScheme="gray"
              onClick={onShowChangePasswordButtonClick}
              leftIcon={<FaKey />}
            >
              Change Password
            </Button>
            <Button
              variant="solid"
              colorScheme="gray"
              onClick={handleLogout}
              leftIcon={<FaSignOutAlt />}
            >
              Log Out
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={onShowDeleteUserButtonClick}
              leftIcon={<FaTrashAlt />}
            >
              Delete Account
            </Button>
          </Stack>
        )}
      </CardBody>
    </Card>
  );
}

export default UserHeader;

// <Card mb={4} p={4} overflow='hidden'>
//   <Avatar size='xl' name={ `${user.first_name} ${user.last_name}` } />
//   <CardTitle my={2}>
//     {
//       (user._id === currentUser?._id)
//         ? <>
//             { `${user.first_name} ${user.last_name}` }
//             <Text d='inline' fontWeight='light' color={ textColor }>
//               { ' (you)' }
//             </Text>
//           </>
//         : `${user.first_name} ${user.last_name.charAt(0)}.`
//     }
//   </CardTitle>
//   <Text>{ `Joined: ${getRelativeTime(user.created_at)}` }</Text>
//   {
//     (user._id === currentUser?._id) &&
//       <Stack direction={["column", "column", "row", "row"]} mt={3}>
//         <Button
//           variant='solid'
//           colorScheme='gray'
//           onClick={ onShowEditUserButtonClick }
//           leftIcon={ <FontAwesomeIcon icon={ faPen } /> }
//         >
//           { 'Edit Info' }
//         </Button>
//         <Button
//           variant='solid'
//           colorScheme='gray'
//           onClick={ onShowChangePasswordButtonClick }
//           leftIcon={ <FontAwesomeIcon icon={ faKey } /> }
//         >
//           { 'Change Password' }
//         </Button>
//         <Button
//           variant='solid'
//           colorScheme='gray'
//           onClick={ handleLogout }
//           leftIcon={ <FontAwesomeIcon icon={ faSignOutAlt } /> }
//         >
//           { 'Log Out' }
//         </Button>
//         <Button
//           variant='solid'
//           colorScheme='red'
//           onClick={ onShowDeleteUserButtonClick }
//           leftIcon={ <FontAwesomeIcon icon={ faTrashAlt } /> }
//         >
//           { 'Delete Account' }
//         </Button>
//       </Stack>
//   }
// </Card>


// <Card mb={4} overflow='hidden'>
//   {/*<Image
//     src={ DEFAULT_THUMBNAIL_MD }
//     objectFit="cover"
//     height='150px'
//     width='100%'
//   />*/}
//   <Box p={4}>
//     <Center>
//       <Avatar
//         size='xl'
//         name={ `${user.first_name} ${user.last_name}` }
//       />
//     </Center>
//     <Center>
//       <CardTitle my={2}>
//         {
//           (user._id === currentUser?._id)
//             ? <>
//                 { `${user.first_name} ${user.last_name}` }
//                 <Text d='inline' fontWeight='light' color={ textColor }>
//                   { ' (you)' }
//                 </Text>
//               </>
//             : `${user.first_name} ${user.last_name.charAt(0)}.`
//         }
//       </CardTitle>
//       {/*<Heading as="h1" size="2xl" fontWeight='semibold' mb={1}>
//         {
//           (user._id === currentUser?._id)
//             ? <>
//                 { `${user.first_name} ${user.last_name}` }
//                 <Text d='inline' fontWeight='light' color={ textColor }>
//                   { ' (you)' }
//                 </Text>
//               </>
//             : `${user.first_name} ${user.last_name.charAt(0)}.`
//         }
//       </Heading>*/}
//     </Center>
//     <Center>
//       <Text>{ `Joined: ${getRelativeTime(user.created_at)}` }</Text>
//     </Center>
//     {
//       (user._id === currentUser?._id) &&
//         <Stack direction={["column", "column", "column", "column"]} mt={3}>
//           <Button
//             variant='solid'
//             colorScheme='gray'
//             onClick={ onShowEditUserButtonClick }
//             leftIcon={ <FontAwesomeIcon icon={ faPen } /> }
//           >
//             { 'Edit Info' }
//           </Button>
//           <Button
//             variant='solid'
//             colorScheme='gray'
//             onClick={ onShowChangePasswordButtonClick }
//             leftIcon={ <FontAwesomeIcon icon={ faKey } /> }
//           >
//             { 'Change Password' }
//           </Button>
//           <Button
//             variant='solid'
//             colorScheme='gray'
//             onClick={ handleLogout }
//             leftIcon={ <FontAwesomeIcon icon={ faSignOutAlt } /> }
//           >
//             { 'Log Out' }
//           </Button>
//           <Button
//             variant='solid'
//             colorScheme='red'
//             onClick={ onShowDeleteUserButtonClick }
//             leftIcon={ <FontAwesomeIcon icon={ faTrashAlt } /> }
//           >
//             { 'Delete Account' }
//           </Button>
//         </Stack>
//     }
//   </Box>
// </Card>
