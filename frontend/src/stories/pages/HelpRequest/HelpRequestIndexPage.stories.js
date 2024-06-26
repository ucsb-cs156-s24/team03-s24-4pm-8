import React from "react";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { rest } from "msw";

import HelpRequestIndexPage from "main/pages/HelpRequest/HelpRequestIndexPage";
import { helpRequestFixtures } from "fixtures/helpRequestFixtures";

export default {
  title: "pages/HelpRequests/HelpRequestIndexPage",
  component: HelpRequestIndexPage,
};

const Template = () => <HelpRequestIndexPage storybook={true} />;

export const Empty = Template.bind({});
Empty.parameters = {
  msw: [
    rest.get("/api/currentUser", (_req, res, ctx) => {
      return res(ctx.json(apiCurrentUserFixtures.userOnly));
    }),
    rest.get("/api/systemInfo", (_req, res, ctx) => {
      return res(ctx.json(systemInfoFixtures.showingNeither));
    }),
    rest.get("/api/helprequests/all", (_req, res, ctx) => {
      return res(ctx.json([]));
    }),
  ],
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.parameters = {
  msw: [
    rest.get("/api/currentUser", (_req, res, ctx) => {
      return res(ctx.json(apiCurrentUserFixtures.userOnly));
    }),
    rest.get("/api/systemInfo", (_req, res, ctx) => {
      return res(ctx.json(systemInfoFixtures.showingNeither));
    }),
    rest.get("/api/helprequests/all", (_req, res, ctx) => {
      return res(ctx.json(helpRequestFixtures.threeHelpRequests));
    }),
  ],
};

export const ThreeItemsAdminUser = Template.bind({});

ThreeItemsAdminUser.parameters = {
  msw: [
    rest.get("/api/currentUser", (_req, res, ctx) => {
      return res(ctx.json(apiCurrentUserFixtures.adminUser));
    }),
    rest.get("/api/systemInfo", (_req, res, ctx) => {
      return res(ctx.json(systemInfoFixtures.showingNeither));
    }),
    rest.get("/api/helprequests/all", (_req, res, ctx) => {
      return res(ctx.json(helpRequestFixtures.threeHelpRequests));
    }),
    rest.delete("/api/helprequests", (req, res, ctx) => {
      window.alert("DELETE: " + JSON.stringify(req.url));
      return res(ctx.status(200), ctx.json({}));
    }),
  ],
};
