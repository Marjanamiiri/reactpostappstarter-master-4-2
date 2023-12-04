import React from "react";
import classes from "./Navbar.module.css";
import { MantineLogo } from "@mantine/ds";
import { Container, Group, Burger, Drawer, Stack, ActionIcon,useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";
import { useLocalStorage } from "use-local-storage";

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <MantineLogo size={28} />
        <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>{items}</Stack>
        </Drawer>
      
      </Container>

      

    </header>
  );
};

export default Navbar;
