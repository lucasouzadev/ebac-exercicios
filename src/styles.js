import styled, { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  :root { --coral: #e66767; --ink: #a43b3b; --peach: #ffebd9; --paper: #fff8f2; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--paper); color: var(--ink); font: 14px/1.55 Roboto, sans-serif; }
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
  background-image: radial-gradient(#e6676755 1px, transparent 1px), radial-gradient(#e6676755 1px, transparent 1px);
  background-position: 0 0, 8px 8px;
  background-size: 16px 16px;
  color: var(--ink);
  text-align: center;
  padding: 34px 0;
  nav { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 8px; font-weight: 900; }
  nav > :first-child { justify-self: start; }
  nav > :last-child { justify-self: end; }
  nav a { text-decoration: none; }
  h1 { font-size: clamp(25px, 5vw, 36px); line-height: 1.15; max-width: 550px; margin: 128px auto 4px; }
`

export const Logo = styled.span`
  display: inline-block; border: 2px solid var(--ink); background: var(--peach); padding: 0 12px;
  color: var(--ink); font-size: 29px; font-style: italic; font-weight: 900; letter-spacing: -.07em;
`

export const Footer = styled.footer`
  padding: 38px 16px 30px; text-align: center; background: var(--peach);
  p { max-width: 480px; margin: 30px auto 0; font-size: 12px; }
`

export const Grid = styled(Container)`
  display: grid; grid-template-columns: repeat(${({ $menu }) => $menu ? 3 : 2}, minmax(0, 1fr));
  gap: 32px; padding-block: 56px 90px;
  @media (max-width: 820px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
  @media (max-width: 540px) { grid-template-columns: 1fr; padding-block: 32px 56px; }
`

export const RestaurantCard = styled.article`
  position: relative; display: flex; flex-direction: column; background: white; border: 1px solid var(--coral);
  > img { width: 100%; height: 218px; object-fit: cover; }
  > div:last-child { display: grid; gap: 12px; align-content: start; padding: 12px; flex: 1; }
  h2 { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 18px; }
  a { justify-self: start; align-self: end; }
`

export const Tags = styled.div`
  position: absolute; top: 10px; right: 10px; display: flex; flex-wrap: wrap; gap: 8px;
  span { background: var(--ink); color: white; padding: 4px 8px; font-weight: 700; }
`

export const Button = styled.button`
  display: inline-block; border: 0; padding: 6px 12px; background: var(--peach); color: var(--ink);
  font-weight: 700; text-align: center; text-decoration: none; cursor: pointer;
  &:hover { background: #fbd8b9; }
  &:disabled { opacity: .65; cursor: default; }
`

export const SolidButton = styled(Button)`
  background: var(--ink); color: white;
  &:hover { background: #7f2828; }
`

export const Cover = styled.section`
  display: grid; align-items: stretch; min-height: 280px; background-position: center; background-size: cover;
  background-color: #392222; color: white;
  > div { display: flex; flex-direction: column; justify-content: space-between; padding-block: 22px; }
  h1, p { font-size: clamp(25px, 5vw, 32px); }
  p { font-weight: 400; text-transform: capitalize; }
`

export const MenuCard = styled.article`
  display: flex; flex-direction: column; gap: 8px; background: var(--coral); color: #351313; padding: 8px;
  img { width: 100%; height: 167px; object-fit: cover; }
  h2 { font-size: 16px; }
  button { margin-top: auto; }
`

export const Notice = styled(Container)`
  padding-block: 52px;
  p { margin: 12px 0; }
`
