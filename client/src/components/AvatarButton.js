import React, { forwardRef } from 'react';
import { Button, Avatar } from '@chakra-ui/react';

const AvatarButton = forwardRef(({
  size = "sm",
  name = null,
  ...restProps
}, ref) => {
  return (
    <Button
      minW={0}
      variant="link"
      _hover={{ textDecoration: 'none' }}
      rounded="full"
      ref={ref}
      {...restProps}
    >
      <Avatar size={size} name={name} />
    </Button>
  );
});

export default AvatarButton;