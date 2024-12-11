import { Box, Tabs } from "@radix-ui/themes"
import Rent from "./rent"
import Add from "./add"
import Notification from "./notifcation"

const Menu = () => {
    return <Tabs.Root defaultValue="rent">
        <Tabs.List>
            <Tabs.Trigger value="rent">Rent Car</Tabs.Trigger>
            <Tabs.Trigger value="add">Add Car</Tabs.Trigger>
            <Tabs.Trigger value="notification">Notification</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
            <Tabs.Content value="rent">
                <Rent></Rent>
            </Tabs.Content>

            <Tabs.Content value="add">
                <Add />

            </Tabs.Content>

            <Tabs.Content value="notification">
                <Notification />
            </Tabs.Content>
        </Box>
    </Tabs.Root>

}
export default Menu