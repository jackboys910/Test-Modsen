import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '@constants/styles/mainColors';
import { resolution } from '@constants/resolutions';

function calculateHeight(ingredientsCount: number) {
  const baseHeight = 1500;
  const reductionPerIngredient = 220;
  const maxVisibleIngredients = 5;
  const visibleIngredients = Math.min(ingredientsCount, maxVisibleIngredients);
  return baseHeight - reductionPerIngredient * (maxVisibleIngredients - visibleIngredients);
}

export const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 1734px;
  margin: 0;

  @media (${resolution.mobile}) {
    height: 2300px;
  }
`;

export const RecipeWrapper = styled.div`
  display: flex;
  width: 66.6vw;
  height: 1196px;
  margin: 249px auto 0;
  position: relative;

  @media (max-width: 960px) {
    margin-left: 60px;
  }

  @media (${resolution.mobile}) {
    display: flex;
    flex-direction: column;
    margin: 70px auto;
    width: 80vw;
  }
`;

export const InfoWrapper = styled.div<{ $ingredientsCount: number }>`
  width: 39.6vw;
  height: 1035px;
  padding: 75px 4.95vw 0 4.95vw;
  border-radius: 28px;
  background-color: ${COLORS.COLOR_MAIN_BLUE};
  position: relative;

  @media (${resolution.laptop}) {
    width: 760px;
  }

  @media (${resolution.mobile}) {
    width: 100%;
    padding: 20px;
    height: ${({ $ingredientsCount }) => calculateHeight($ingredientsCount)}px;
    flex-shrink: 0;
  }
`;

export const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 250px;

  img {
    max-width: 28.6vw;
    max-height: 549px;
    object-fit: cover;

    @media (${resolution.mobile}) {
      width: 100%;
      height: auto;
      max-width: 100%;
      height: 318.18px;
      width: 311.46px;
    }
  }

  @media (${resolution.mobile}) {
    width: 100%;
    padding-bottom: 53px;
  }
`;

export const MealSection = styled.div`
  font-family: 'PoppinsMedium';
  font-weight: 500;
  font-size: 13px;
  line-height: 19.5px;
  letter-spacing: 0.17em;
  color: ${COLORS.COLOR_TYPE_BEIGE};
  height: 20px;
`;

export const TypeSection = styled.div`
  margin-bottom: 20px;
  width: 392px;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (${resolution.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 520px) {
    width: 250px;
  }
`;

export const TypeSectionPart = styled.div`
  display: flex;
  height: 24px;
  margin-top: 25px;

  p {
    margin: 0;
  }

  svg {
    margin-right: 15px;
  }
`;

export const IngredientsSection = styled.div`
  margin-bottom: 20px;
  margin-top: 70px;
  width: 29.8vw;
  height: 250px;
  border-radius: 20px;
  background: linear-gradient(90deg, rgba(217, 217, 217, 0) 23.93%, rgba(217, 217, 217, 0.1) 100%);
  border: 2px solid transparent;
  border-left: 0;
  border-image-source: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%);

  span {
    position: absolute;
  }

  ul {
    list-style-type: none;
    padding-left: 0;

    @media (${resolution.mobile}) {
      list-style-type: none;
      padding-left: 0;
    }
  }

  li {
    font-family: 'PoppinsMedium';
    font-weight: 500;
    font-size: 0.85vw;
    line-height: 24px;
    height: 30px;
    color: ${COLORS.COLOR_INGREDIENTS_GREY};
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    position: relative;

    @media (max-width: 1420px) {
      font-size: 1vw;
    }

    @media (${resolution.laptop}) {
      font-size: 1.2vw;
    }

    @media (max-width: 960px) {
      font-size: 1.3vw;
    }

    @media (max-width: 850px) {
      font-size: 1.5vw;
    }

    @media (${resolution.mobile}) {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 10px;
      height: 210px;
      font-size: 12px;
      line-height: 18px;
    }
  }

  svg {
    margin-right: 20px;

    @media (${resolution.mobile}) {
      margin-right: 15px;
    }
  }

  @media (max-width: 1420px) {
    width: 33vw;
  }

  @media (${resolution.laptop}) {
    width: 40vw;
  }

  @media (max-width: 960px) {
    width: 45vw;
  }

  @media (max-width: 850px) {
    width: 49vw;
  }

  @media (${resolution.mobile}) {
    background: none;
    border: none;
    border-image-source: none;
    margin-top: 90px;
    width: 75vw;

    img {
      margin-left: 10px;
      margin-top: 15px;
      width: 163px;
      height: 163px;
      border-radius: 20px;
    }
  }
`;

export const ProductsSection = styled.div`
  margin-bottom: 20px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  img {
    width: 163px;
    height: 163px;
    border-radius: 20px;
    margin-right: 2.08vw;
    margin-bottom: 20px;
  }

  img:nth-child(3n) {
    margin-right: 0;
  }

  @media (${resolution.laptop}) {
    img:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

export const RecipeTitle = styled.h2`
  font-family: 'PlayfairDisplayMedium';
  font-weight: 500;
  font-size: 40px;
  line-height: 53.32px;
  color: white;
  height: 99px;
  margin-bottom: 10px;
  margin-top: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (${resolution.mobile}) {
    font-size: 30px;
    line-height: 45px;
  }
`;

export const ProductsTitle = styled.h2`
  font-family: 'PlayfairDisplayBold';
  font-weight: 700;
  font-size: 24px;
  line-height: 31.99px;
  color: white;
  width: 103px;
  height: 30px;
  margin-bottom: 10px;
`;

export const IngredientsTitle = styled.h2`
  font-family: 'PlayfairDisplayBold';
  font-weight: 700;
  font-size: 24px;
  line-height: 31.99px;
  color: white;
  width: 140px;
  height: 30px;
  margin-bottom: 10px;
`;

export const Data = styled.p`
  font-family: 'PoppinsRegular';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: white;
  height: 24px;
`;

export const LinkWrapper = styled.div`
  margin-top: 91px;

  a {
    font-family: 'PlayfairDisplayBold';
    font-weight: 700;
    font-size: 24px;
    line-height: 31.99px;
    color: white;
    width: 124px;
    height: 32px;
    text-decoration: none;
    display: inline-block;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 1915px) {
    margin-top: 0;
    position: absolute;
    bottom: 15px;
  }
`;

export const StyledLink = styled(Link)`
  font-family: 'SpaceGroteskMedium';
  font-weight: 500;
  font-size: 24px;
  line-height: 30.62px;
  color: white;
  position: absolute;
  right: 0;
  top: 23%;
  text-decoration: none;
`;
