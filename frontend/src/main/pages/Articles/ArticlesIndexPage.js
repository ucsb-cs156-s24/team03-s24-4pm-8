
import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import ArticlesTable from 'main/components/Articles/ArticlesTable';
import { Button } from 'react-bootstrap';
import { useCurrentUser , hasRole} from 'main/utils/currentUser';

export default function ArticlesIndexPage() {

  const currentUser = useCurrentUser();

  const createButton = () => {
    if (hasRole(currentUser, "ROLE_ADMIN")) {
        return (
            <Button
                variant="primary"
                href="/articles/create"
                style={{ float: "right" }}
            >
                Create Article 
            </Button>
        )
    } 
  }

  const { data: dates, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/articles/all"],
      { method: "GET", url: "/api/articles/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        {createButton()}
        <h1>Articles</h1>
        <ArticlesTable dates={dates} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
} 

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function ArticlesIndexPage() {

  // Stryker disable all : placeholder for future implementation
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Index page not yet implemented</h1>
        <p><a href="/articles/create">Create</a></p>
        <p><a href="/articles/edit/1">Edit</a></p>
      </div>
    </BasicLayout>
  )
}
