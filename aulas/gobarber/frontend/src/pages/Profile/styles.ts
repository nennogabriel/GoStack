import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  header {
    height: 144px;
    background: #28262e;
    width: 100%;
    display: flex;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
      color: #999591;
    }

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  margin: -186px auto 0;
  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;

    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  width: 186px;
  align-self: center;
  position: relative;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    background: #ff9000;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    border: 0;
    cursor: pointer;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
