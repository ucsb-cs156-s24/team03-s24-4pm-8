import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function UCSBOrganizationForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all
   
    const navigate = useNavigate();

    const testIdPrefix = "UCSBOrganizationForm";

    return (
        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                <Form.Label htmlFor="id">Id</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-id"}
                    id="id"
                    type="text"
                    {...register("id")}
                    value={initialContents.id}
                    disabled
                />
                </Form.Group>
                
            )}

            <Form.Group className="mb-3" >
                    <Form.Label htmlFor="orgCode">orgCode</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-orgCode"}
                        id="orgCode"
                        type="text"
                        
                        isInvalid={Boolean(errors.orgCode)} // was originally .name
                        {...register("orgCode", {
                            required: "orgCode is required.",
                            maxLength : {
                                value: 5,
                                message: "Max length 5 characters"
                        }
                    })}
                    
                    
                   /*
                    {...register("orgCode")}
                    value={initialContents.orgCode}
                    disabled
                    */
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.orgCode?.message}
                    </Form.Control.Feedback>
                </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="orgTranslationShort">Short Organization Name</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-orgTranslationShort"}
                    id="orgTranslationShort"
                    type="text"
                    isInvalid={Boolean(errors.orgTranslationShort)} // was originally .name
                    {...register("orgTranslationShort", {
                        required: "orgTranslationShort is required.",
                        maxLength : {
                            value: 30,
                            message: "Max length 30 characters"
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.orgTranslationShort?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="orgTranslation">Full Organization Name</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-orgTranslation"}
                    id="orgTranslation"
                    type="text"
                    isInvalid={Boolean(errors.orgTranslation)}
                    {...register("orgTranslation", {
                        required: "orgTranslation is required." ,
                        maxLength : {
                            value: 50,
                            message: "Max length 50 characters"
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.orgTranslation?.message} 
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="inactive">Inactive Status</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-inactive"}
                    as="select"
                    id="inactive"
                    {...register("inactive")}
                >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                </Form.Control>
            </Form.Group>



            <Button
                type="submit"
                data-testid={testIdPrefix + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default UCSBOrganizationForm;