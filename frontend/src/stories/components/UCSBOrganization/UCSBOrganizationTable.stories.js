import React from 'react';
import UCSBOrganizationTable from 'main/components/UCSBOrganization/UCSBOrganizationTable';
import { ucsbOrganizationFixtures } from 'fixtures/ucsbOrganizationFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';
import { rest } from "msw";

export default {
    title: 'components/UCSBOrganization/UCSBOrganizationTable',
    component: UCSBOrganizationTable
};

const Template = (args) => {
    return (
        <UCSBOrganizationTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    ucsborganization: []
};

export const ThreeOrgsOrdinaryUser = Template.bind({});

ThreeOrgsOrdinaryUser.args = {
    ucsborganization: ucsbOrganizationFixtures.threeOrganizations,
    currentUser: currentUserFixtures.userOnly,
};

export const ThreeOrgsAdminUser = Template.bind({});
ThreeOrgsAdminUser.args = {
    ucsborganization: ucsbOrganizationFixtures.threeOrganizations,
    currentUser: currentUserFixtures.adminUser,
}

ThreeOrgsAdminUser.parameters = {
    msw: [
        rest.delete('/api/ucsborganization', (req, res, ctx) => {
            window.alert("DELETE: " + JSON.stringify(req.url));
            return res(ctx.status(200),ctx.json({}));
        }),
    ]
};
