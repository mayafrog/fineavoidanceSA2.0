import { Grid, Text } from '@mantine/core';
import React from "react";
import { ColourButton } from '../../components';

function Navbar() {
    return (
        <Grid justify={"space-between"} align={"center"}>
            <Grid.Col span={10}>
                <Text
                    component="span"
                    align="center"
                    size="xl"
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                > FineAvoidanceSA2.0
                </Text>
            </Grid.Col>
            <Grid.Col span={2}>
                <ColourButton>Home</ColourButton>
            </Grid.Col>
        </Grid>
    )
}

export default Navbar;