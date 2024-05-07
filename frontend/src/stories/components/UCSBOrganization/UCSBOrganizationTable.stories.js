import React from 'react';
import UCSBOrgaizationTable from 'main/components/UCSBOrganization/UCSBOrgaizationTable';
import { ucsbOrganizationFixtures } from 'fixtures/ucsbOrganizationFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';
import { rest } from "msw";

export default {
    title: 'components/UCSBOrganization/UCSBOrgaizationTable',
    component: UCSBOrgaizationTable
};

const Template = (args) => {
    return (
        <UCSBOrgaizationTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    ucsborganizations: []
};

export const ThreeOrgsOrdinaryUser = Template.bind({});

ThreeOrgsOrdinaryUser.args = {
    ucsborganizations: ucsbOrganizationFixtures.threeOrganizations,
    currentUser: currentUserFixtures.userOnly,
};

export const ThreeOrgsAdminUser = Template.bind({});
ThreeOrgsAdminUser.args = {
    ucsborganizations: ucsbOrganizationFixtures.threeOrganizations,
    currentUser: currentUserFixtures.adminUser,
}

ThreeOrgsAdminUser.parameters = {
    msw: [
        rest.delete('/api/ucsborganizations', (req, res, ctx) => {
            window.alert("DELETE: " + JSON.stringify(req.url));
            return res(ctx.status(200),ctx.json({}));
        }),
    ]
};
