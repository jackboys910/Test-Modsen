import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '@constants/styles/mainColors';

export const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 1804px;
  margin: 0;
`;

export const RecipeWrapper = styled.div`
  display: flex;
  width: 1280px;
  height: 1196px;
  margin: 229px auto 0;
  position: relative;
`;

export const InfoWrapper = styled.div`
  width: 760px;
  height: 1035px;
  padding: 75px 95px 0 95px;
  border-radius: 28px;
  background-color: ${COLORS.COLOR_MAIN_BLUE};
`;

export const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 250px;

  img {
    max-width: 549px;
    max-height: 549px;
    object-fit: cover;
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
  width: 572px;
  height: 250px;
  border-radius: 20px;
  background: linear-gradient(90deg, rgba(217, 217, 217, 0) 23.93%, rgba(217, 217, 217, 0.1) 100%);
  border: 2px solid transparent;
  border-left: 0;
  border-image-source: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%);

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    font-family: 'PoppinsMedium';
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    height: 30px;
    color: ${COLORS.COLOR_INGREDIENTS_GREY};
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  svg {
    margin-right: 20px;
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
    margin-right: 40px;
    margin-bottom: 20px;
  }

  img:nth-child(3n) {
    margin-right: 0;
  }
`;

export const RecipeTitle = styled.h2`
  font-family: 'PlayfairDisplayMedium';
  font-weight: 500;
  font-size: 40px;
  line-height: 53.32px;
  color: white;
  height: 97px;
  margin-bottom: 10px;
  margin-top: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  }

  a:hover {
    text-decoration: underline;
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
