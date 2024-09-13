import { Link } from "react-router-dom";
import styled from "styled-components";

export const AppContainer = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const NavBar = styled.nav`
  background-color: #4a90e2;
  padding: 15px 0;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 80%;
    text-align: center;
  }
`;

export const ContentArea = styled.main`
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const PageTitle = styled.h2`
  color: #4a90e2;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a7bd5;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Select = styled.select`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
