import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/UCSBOrganizationUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function UCSBOrganizationTable({
    ucsborganization,
    currentUser,
    testIdPrefix = "UCSBOrganizationTable" }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/ucsborganization/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ucsborganization/all"] 
    );
    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Org Acronym', 
            accessor: 'orgCode',
        },
        {
            Header: 'Short Organization Name',
            accessor: 'orgTranslationShort',
        },
        {
            Header: 'Full Organization Name',
            accessor: 'orgTranslation',
        },
        {
            Header: 'Inactive Status',
            accessor: 'inactive',
        }
    ];

    if (hasRole(currentUser, "ROLE_ADMIN")) {
        columns.push(ButtonColumn("Edit", "primary", editCallback, testIdPrefix));
        columns.push(ButtonColumn("Delete", "danger", deleteCallback, testIdPrefix));
    } 

    return <OurTable
        data={ucsborganization}
        columns={columns}
        testid={testIdPrefix}
    />;
};

