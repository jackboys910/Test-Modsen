import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';

const RecipeDetailsPage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();

  return (
    <div>
      <Header />
      <h1>Recipe Details</h1>
      <p>Recipe ID: {recipeId}</p>
      <Footer />
    </div>
  );
};

export default RecipeDetailsPage;
