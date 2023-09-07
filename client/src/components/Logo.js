import { Heading, useColorModeValue, Icon } from '@chakra-ui/react';
import { FaBolt } from 'react-icons/fa';

const Logo = (props) => {
  return (
    <Heading
      color={useColorModeValue('brand.500', 'brand.200')}
      // as={NavLink}
      // to={isAuthenticated ? '/home' : '/'}
      size="md"
      fontWeight="extrabold"
      {...props}
    >
      <Icon
        as={FaBolt}
        boxSize={4}
        color={useColorModeValue('brand.500', 'brand.200')}
        mr={1}
      />
      shakedown
    </Heading>
  );
};

export default Logo;
