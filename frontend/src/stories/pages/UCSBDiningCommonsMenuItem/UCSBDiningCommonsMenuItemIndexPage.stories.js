import React from 'react';
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { ucsbDiningCommonsMenuItemsFixtures } from "fixtures/ucsbDiningCommonsMenuItemsFixtures";
import { rest } from "msw";

import UCSBDiningCommonsMenuItemIndexPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemIndexPage";

export default {
    title: 'pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemIndexPage',
    component: UCSBDiningCommonsMenuItemIndexPage
};

const Template = () => <UCSBDiningCommonsMenuItemIndexPage storybook={true}/>;

export const Empty = Template.bind({});
Empty.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res(ctx.json(apiCurrentUserFixtures.userOnly));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/diningcommonsmenuitem/all', (_req, res, ctx) => {
            return res(ctx.json([]));
        }),
    ]
}

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res( ctx.json(apiCurrentUserFixtures.userOnly));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/diningcommonsmenuitem/all', (_req, res, ctx) => {
            return res(ctx.json(ucsbDiningCommonsMenuItemsFixtures.threeDiningCommonsMenuItems));
        }),
    ],
}

export const ThreeItemsAdminUser = Template.bind({});

ThreeItemsAdminUser.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res( ctx.json(apiCurrentUserFixtures.adminUser));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/diningcommonsmenuitem/all', (_req, res, ctx) => {
            return res(ctx.json(ucsbDiningCommonsMenuItemsFixtures.threeDiningCommonsMenuItems));
        }),
        rest.delete('/api/diningcommonsmenuitem', (req, res, ctx) => {
            window.alert("DELETE: " + JSON.stringify(req.url));
            return res(ctx.status(200),ctx.json({}));
        }),
    ],
}
