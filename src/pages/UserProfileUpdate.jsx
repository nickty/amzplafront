import { useState, useEffect, useCallback } from "react";
import {
  useDataProvider,
  useGetIdentity,
  useNotify,
  useRefresh,
} from "react-admin";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Subscription from "../components/Subscription";

// Styled components
const FormContainer = styled.div`
  max-width: 700px;
  margin: 1rem auto;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  margin-right: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
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
  const refresh = useRefresh();
  const { data: userData, isLoading: identityLoading } = useGetIdentity();

  useEffect(() => {
    if (identityLoading || !userData) return;

    dataProvider
      .getOne("users", { id: userData.id })
      .then(({ data }) => {
        reset(data); // Reset form with fetched data
        setLoading(false);
      })
      .catch((error) => {
        notify("Error loading user profile", "error");
        setLoading(false);
      });
  }, [dataProvider, notify, reset, userData, identityLoading]);

  const onSubmit = useCallback(
    (formData) => {
      if (!userData) {
        notify("User is not authenticated.", "warning");
        return;
      }

      const profileData = { ...formData }; // Copy form data
      delete profileData.subscription; // Remove subscription data

      setLoading(true);
      dataProvider
        .update("users", { id: userData.id, data: profileData })
        .then(() => {
          notify("Profile updated successfully", "info");
        })
        .catch((error) => {
          notify("Error updating profile", "error");
        })
        .finally(() => setLoading(false));
    },
    [dataProvider, notify, userData]
  );

  const handleSubscriptionChange = useCallback(
    (newSubscription) => {
      if (!userData) {
        notify("User is not authenticated.", "warning");
        return;
      }

      setLoading(true);

      // Retrieve existing user data from local storage
      const storedUserData = JSON.parse(localStorage.getItem("auth"));

      // Update only the subscription field
      const updatedUserData = {
        ...storedUserData,
        subscription: newSubscription,
      };

      // Save the updated user data back to local storage
      localStorage.setItem("auth", JSON.stringify(updatedUserData));

      // Notify user and refresh UI
      notify("Subscription updated successfully", "info");
      refresh();
      setLoading(false);
    },
    [notify, userData, refresh]
  );

  if (loading || identityLoading) return <div>Loading...</div>;

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="fullName">Name:</Label>
          <Input id="fullName" {...register("fullName")} />
        </div>
        <div>
          <Label htmlFor="address">Address:</Label>
          <Input id="address" {...register("address")} />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number:</Label>
          <Input id="phone" {...register("phone")} />
        </div>
        <Button type="submit">Update Profile</Button>
      </Form>
      <div style={{ margin: 20 }}>...</div>
      <div>
        <Label>Current Plan:</Label>
        <Button2>{userData?.subscription}</Button2>
        <Subscription onSubscriptionChange={handleSubscriptionChange} />
      </div>
    </FormContainer>
  );
};

export default UserProfileUpdate;
