import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBDiningCommonsMenuItemsForm from "main/components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemsForm"; // hopefully this path is right 
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function UCSBDiningCommonsMenuItemsCreatePage({storybook=false}) { 

  const objectToAxiosParams = (UCSBDiningCommonsMenuItem) => ({ // UCSBDiningCommonsMenuItem
    url: "/api/diningcommonsmenuitem/post",
    method: "POST",
    params: {
     //id: UCSBDiningCommonsMenuItem.id,
     diningCommonsCode: UCSBDiningCommonsMenuItem.diningCommonsCode,
     name: UCSBDiningCommonsMenuItem.name,
     station: UCSBDiningCommonsMenuItem.station
    }
  }); 

  const onSuccess = (UCSBDiningCommonsMenuItem) => {
    toast(`New UCSBDiningCommonsMenuItem Created - id: ${UCSBDiningCommonsMenuItem.id} diningCommonsCode: ${UCSBDiningCommonsMenuItem.diningCommonsCode} name: ${UCSBDiningCommonsMenuItem.name} station: ${UCSBDiningCommonsMenuItem.station}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/diningcommonsmenuitem/all"] // mutation makes this key stale so that pages relying on it reload
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/diningcommonsmenuitem" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New UCSBDiningCommonsMenuItem</h1>
        <UCSBDiningCommonsMenuItemsForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}

export default function UCSBDiningCommonsMenuItemCreatePage() {

  // Stryker disable all : placeholder for future implementation
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create page not yet implemented</h1>
      </div>
    </BasicLayout>
  )
}