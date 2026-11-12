import styled, { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  :root { --coral: #e66767; --ink: #a43b3b; --peach: #ffebd9; --paper: #fff8f2; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--paper); color: var(--coral); font: 14px/1.57 Roboto, sans-serif; }
  #root { min-height: 100vh; display: flex; flex-direction: column; }
  main { flex: 1; }
  h1, h2, p { margin: 0; }
  img { display: block; max-width: 100%; }
  a { color: inherit; }
  button, input { font: inherit; }
  :focus-visible { outline: 3px solid #431921; outline-offset: 3px; }
`

export const Container = styled.div`
  width: min(1024px, calc(100% - 32px)); margin-inline: auto;
`

export const Header = styled.header`
  background-color: var(--peach);
  background-image:
    radial-gradient(ellipse 1px 6px at 10px 22px, #e6676717 96%, transparent),
    radial-gradient(ellipse 3px 5px at 10px 14px, #e6676712 96%, transparent),
    radial-gradient(ellipse 1px 7px at 19px 20px, #e6676717 96%, transparent),
    radial-gradient(ellipse 2px 5px at 18px 15px, #e6676712 96%, transparent);
  background-size: 32px 40px;
  text-align: center;
  min-height: ${({ $home }) => $home ? '360px' : '164px'};
  padding: 40px 0 0;
  .brand { margin-inline: auto; width: clamp(82px, 14vw, 126px); height: auto; }
  nav { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 8px; font-size: 18px; font-weight: 900; }
  nav > :first-child { justify-self: start; }
  nav > :last-child { justify-self: end; }
  nav a { text-decoration: none; }
  h1 { font-size: clamp(25px, 5vw, 36px); font-weight: 900; line-height: 1.15; max-width: 550px; margin: 138px auto 0; padding-inline: 10px; }
  @media (max-width: 540px) {
    min-height: ${({ $home }) => $home ? '280px' : '108px'};
    padding-top: 24px;
    nav { font-size: 13px; }
    h1 { margin-top: 85px; }
  }
`

export const CartTrigger = styled.button`
  border: 0;
  padding: 4px 0;
  color: inherit;
  background: transparent;
  font-weight: inherit;
  text-align: right;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`

export const Footer = styled.footer`
  padding: 38px 16px 30px; text-align: center; background: var(--peach);
  .brand { margin: auto; }
  .social { display: flex; justify-content: center; gap: 8px; margin-top: 12px; }
  .social span { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: var(--coral); color: white; font-weight: 700; }
  p { max-width: 480px; margin: 70px auto 0; font-size: 11px; }
`

export const Grid = styled(Container)`
  display: grid; grid-template-columns: repeat(${({ $menu }) => $menu ? 3 : 2}, minmax(0, 1fr));
  gap: ${({ $menu }) => $menu ? '32px' : '48px 80px'};
  padding-block: ${({ $menu }) => $menu ? '56px 120px' : '80px 120px'};
  @media (max-width: 820px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
  @media (max-width: 540px) { grid-template-columns: 1fr; padding-block: 32px 56px; }
`

export const RestaurantCard = styled.article`
  position: relative; display: flex; flex-direction: column; background: white; border: 1px solid var(--coral);
  > img { width: 100%; height: 218px; object-fit: cover; }
  > div:last-child { display: grid; grid-template-rows: auto 1fr auto; gap: 8px; padding: 8px; flex: 1; }
  h2 { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 18px; font-weight: 900; }
  h2 span { display: flex; gap: 8px; align-items: center; }
  h2 b { color: #ffb930; font-size: 22px; line-height: 1; }
  a { justify-self: start; align-self: end; }
`

export const Tags = styled.div`
  position: absolute; top: 10px; right: 10px; display: flex; flex-wrap: wrap; gap: 8px;
  span { background: var(--coral); color: white; padding: 4px 8px; font-size: 12px; font-weight: 700; text-transform: capitalize; }
`

export const Button = styled.button`
  display: inline-block; border: 0; padding: 4px 8px; background: var(--peach); color: var(--coral);
  font-size: 14px; font-weight: 700; line-height: 16px; text-align: center; text-decoration: none; cursor: pointer;
  &:hover { background: #fbd8b9; }
  &:disabled { opacity: .65; cursor: default; }
`

export const SolidButton = styled(Button)`
  background: var(--coral); color: white;
  &:hover { background: var(--ink); }
`

export const Cover = styled.section`
  display: grid; align-items: stretch; min-height: 280px; background-position: center; background-size: cover;
  background-color: #392222; color: white;
  > div { display: flex; flex-direction: column; justify-content: space-between; padding-block: 18px 24px; }
  h1, p { font-size: clamp(25px, 5vw, 32px); }
  h1 { font-weight: 900; }
  p { font-weight: 300; text-transform: capitalize; }
`

export const MenuCard = styled.article`
  display: flex; flex-direction: column; gap: 8px; background: var(--coral); color: var(--peach); padding: 8px;
  img { width: 100%; height: 167px; object-fit: cover; }
  h2 { font-size: 16px; font-weight: 900; line-height: 19px; }
  p { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; overflow: hidden; min-height: 6.28em; }
  button { margin-top: auto; width: 100%; }
`

export const Notice = styled(Container)`
  padding-block: 52px;
  p { margin: 12px 0; }
`
