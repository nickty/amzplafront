import { useState, useEffect, useCallback } from "react";
import { useDataProvider, useGetIdentity, useNotify } from "react-admin";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Subscription from "../components/Subscription";

// Styled components
const FormContainer = styled.div`
  min-width: 800px;
  margin: 1rem auto;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex; // Ensure this container is a flex container
  flex-direction: column; // Align children in a column
  align-items: flex-start; // Align children to the start (left)
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%; // Ensure the form takes the full width of its container
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  margin-right: 1rem;
  align-self: flex-start; // Ensure labels are aligned to the start within flex containers
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; // Inputs take the full width available, ensuring left alignment
`;

const Button2 = styled.span`
  padding: 0.2rem 0.7rem;
  border-radius: 5px;
  display: inline-block;
  background-color: red;
  color: white;
  margin-left: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  width: 200px;
  margin-top: 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const UserProfileUpdate = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);

  const { error, data, isLoading: identityLoading } = useGetIdentity();

  useEffect(() => {
    if (identityLoading) return;
    if (!data) {
      notify("User is not authenticated.", "warning");
      setLoading(false);
      return;
    }

    dataProvider
      .getOne("users", { id: data.id })
      .then(({ data }) => {
        reset(data);
        setLoading(false);
      })
      .catch((error) => {
        notify("Error loading user profile", "error");
        setLoading(false);
      });
  }, [data, identityLoading, dataProvider, notify, reset]);

  const onSubmit = (formData) => {
    if (!data) {
      notify("User is not authenticated.", "warning");
      return;
    }

    dataProvider
      .update("users", { id: data.id, data: formData })
      .then(() => {
        notify("Profile updated successfully", "info");
        console.log("check after subs", data);
      })
      .catch((error) => {
        notify("Error updating profile", "error");
      });
  };

  // Inside UserProfileUpdate component
  const handleSubscriptionChange = useCallback(
    (newSubscription) => {
      // Assuming `data.id` is the user ID
      if (!data) {
        notify("User is not authenticated.", "warning");
        return;
      }
      console.log("check for subs", newSubscription);
      dataProvider
        .update("users", {
          id: data.id,
          data: { subscription: newSubscription },
        })
        .then(() => {
          notify("Subscription updated successfully", "info");
        })
        .catch((error) => {
          notify("Error updating subscription", "error");
        });
    },
    [dataProvider, data, notify]
  ); // Add any other dependencies if needed

  if (loading || identityLoading) return <div>Loading...</div>;

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Name:</Label>
          <Input {...register("fullName", { required: true })} />
        </div>
        <div>
          <Label>Address:</Label>
          <Input {...register("address")} />
        </div>
        <div>
          <Label>Phone Number:</Label>
          <Input {...register("phone")} />
        </div>
        <Button type="submit">Update Profile</Button>
        <p>...</p>
        <div>
          <label>Current Plan:</label>
          <Button2>{data.subscription}</Button2>
        </div>
        <Subscription onSubscriptionChange={handleSubscriptionChange} />
      </Form>
    </FormContainer>
  );
};

export default UserProfileUpdate;
