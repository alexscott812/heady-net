import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';
import palette from './palette.js';

const theme = extendTheme({
  config: {
    initialColorMode: 'system'
  },
  fonts: {
    heading: `Inter, ${baseTheme.fonts.heading}`,
    body: `Inter, ${baseTheme.fonts.body}`
  },
  space: {
    18: '4.5rem',
  },
  colors: {
    brand: palette.indigo,
    ...palette
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.50', 'gray.900')(props)
      }
    }),
  },
  components: {
    Alert: {
      defaultProps: {
        variant: 'left-accent'
      }
    },
    Button: {
      baseStyle: {
        borderRadius: 'full'
      },
      defaultProps: {
        colorScheme: 'brand',
      }
    },
    Card: {
      baseStyle: (props) => ({
        bg: mode('white', 'gray.800')(props),
        d: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
      }),
      variants: {
        outer: {
          // boxShadow: 'base',
          borderLeftWidth: [0,1,1,1],
          borderRightWidth: [0,1,1,1],
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderRadius: ['none', 'xl', 'xl', 'xl'],
          // borderRadius: ['none', 'md', 'md', 'md'],
          mx: [-4,0,0,0]
        },
        inner: {
          boxShadow: 'none',
          borderRadius: 'md',
          borderWidth: 1
        }
      },
      defaultProps: {
        variant: 'outer'
      }
    },
    CloseButton: {
      baseStyle: {
        borderRadius: 'full'
      }
    },
    Container: {
      baseStyle: {
        maxW: 'container.lg'
      }
    },
    Drawer: {
      baseStyle: (props) => ({
        dialog: {
          bg: mode('white', 'gray.800')(props)
        },
        closeButton: {
          borderRadius: 'full'
        }
      })
    },
    Image: {
      baseStyle: {
        borderRadius: 'md'
      }
    },
    Link: {
      variants: {
        brand: (props) => ({
          color: mode('brand.500', 'brand.200')(props),
        }),
      }
    },
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: mode('white', 'gray.800')(props),
          borderRadius: 'xl'
        },
        closeButton: {
          borderRadius: 'full'
        }
      })
    },
    Menu: {
      baseStyle: (props) => ({
        list: {
          bg: mode('white', 'gray.800')(props),
          zIndex: 'dropdown',
          borderRadius: 'xl'
        }
      })
    },
    Main: {
      baseStyle: {
        pt: baseTheme.space[14]
      }
    },
    Navigation: {
      baseStyle: (props) => ({
        position: 'fixed',
        zIndex: 'sticky',
        w: '100%',
        h: baseTheme.space[14],
        bg: mode('white', 'gray.800')(props),
        //boxShadow: 'base'
        borderBottomWidth: '1px'
      })
    },
    PageHead: {
      baseStyle: (props) => ({
        position: 'fixed',
        zIndex: 'docked',
        w: '100%',
        bg: mode('white', 'gray.800')(props),
        //boxShadow: 'base',
        // borderTopWidth: '1px',
        borderBottomWidth: '1px'
      })
    },
    Popover: {
      baseStyle: (props) => ({
        content: {
          bg: mode('white', 'gray.800')(props),
          borderRadius: 'xl'
        }
      })
    },
    Skeleton: {
      baseStyle: {
        borderRadius: 'md'
      }
    },
    Text: {
      variants: {
        secondary: (props) => ({
          // color: mode('gray.600', 'gray.400')(props),
          color: mode('gray.600', 'whiteAlpha.700')(props),
          fontWeight: 'normal'
        }),
        tertiary: (props) => ({
          // color: mode('gray.600', 'gray.400')(props),
          color: mode('gray.600', 'whiteAlpha.700')(props),
          fontWeight: 'light',
          fontSize: 'xs'
        }),
        'subtle-bold': (props) => ({
          color: mode('gray.500', 'whiteAlpha.600')(props),
          fontWeight: 'semibold',
          textTransform: 'uppercase'
        })
      }
    },
    Textarea: {
      defaultProps: {
        variant: 'filled'
      }
    },
    Input: {
      defaultProps: {
        variant: 'filled'
      }
    }
  }
});

export default theme;
