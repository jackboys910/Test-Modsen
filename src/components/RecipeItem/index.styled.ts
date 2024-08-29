import styled from 'styled-components';
import { COLORS } from '../../constants/styles/mainColors';

export const ItemWrapper = styled.div`
  width: 293px;
  height: 436px;
  border: 1px solid ${COLORS.COLOR_BACKGROUND_GREY};
  border-radius: 20px;
  overflow: hidden;
  text-align: center;
  background-color: ${COLORS.COLOR_BACKGROUND_GREY};
  cursor: pointer;
`;

export const RecipeImage = styled.img`
  width: 100%;
  height: 321px;
  object-fit: cover;
  border-radius: 18px 18px 0 0;
`;

export const RecipeLabel = styled.div`
  font-family: 'InterBold';
  font-size: 22px;
  font-weight: 700;
  line-height: 26.63px;
  color: ${COLORS.COLOR_TITLE_VIOLET};
  padding-top: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
