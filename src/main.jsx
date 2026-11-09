import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { loadCatalog } from './catalog'
import ProductDetails from './ProductDetails'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { addItem, selectItems, store } from './cart'
import Cart from './Cart.jsx'
import {
  Button, Container, Cover, Footer, Global, Grid, Header, Logo,
  MenuCard, Notice, RestaurantCard, SolidButton, Tags
} from './styles'

function Brand() {
  return <Link to="/" aria-label="efood, início"><Logo>efood</Logo></Link>
}

function Home({ restaurants }) {
  return <>
    <Header><Brand /><h1>Viva experiências gastronômicas no conforto da sua casa</h1></Header>
    <main><Grid>
      {restaurants.map(restaurant => <RestaurantCard key={restaurant.id}>
        <img src={restaurant.capa} alt="" />
        <Tags>
          {restaurant.destacado && <span>Destaque da semana</span>}
          <span>{restaurant.tipo}</span>
        </Tags>
        <div>
          <h2>{restaurant.titulo}<span aria-label={'Avaliação ' + restaurant.avaliacao}>★ {restaurant.avaliacao}</span></h2>
          <p>{restaurant.descricao}</p>
          <SolidButton as={Link} to={'/restaurantes/' + restaurant.id}>Saiba mais</SolidButton>
        </div>
      </RestaurantCard>)}
    </Grid></main>
  </>
}

function Restaurant({ restaurants }) {
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const count = useSelector(selectItems).length
  const dispatch = useDispatch()
  const { id } = useParams()
  const restaurant = restaurants.find(item => String(item.id) === id)

  if (!restaurant) return <main><Notice><h1>Restaurante não encontrado</h1><Link to="/">Voltar aos restaurantes</Link></Notice></main>

  return <>
    <Header><Container as="nav" aria-label="Navegação principal">
      <Link to="/">Restaurantes</Link><Brand /><Button onClick={() => setCartOpen(true)}>Carrinho ({count})</Button>
    </Container></Header>
    <main>
      <Cover style={{ backgroundImage: 'linear-gradient(#0008,#0009), url("' + restaurant.capa + '")' }}>
        <Container><p>{restaurant.tipo}</p><h1>{restaurant.titulo}</h1></Container>
      </Cover>
      <Grid $menu>{restaurant.cardapio.map(product => <MenuCard key={product.id}>
        <img src={product.foto} alt="" />
        <h2>{product.nome}</h2>
        <p>{product.descricao}</p>
        <Button onClick={() => setSelected(product)}>Comprar o produto</Button>
      </MenuCard>)}</Grid>
    </main>
  </>
}

function App() {
  const [restaurants, setRestaurants] = useState(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  useEffect(() => {
    const controller = new AbortController()
    loadCatalog(controller.signal)
      .then(data => { if (!controller.signal.aborted) setRestaurants(data) })
      .catch(() => { if (!controller.signal.aborted) setError('Não foi possível carregar os restaurantes.') })
    return () => controller.abort()
  }, [attempt])

  let page = <main><Notice><p role="status">Carregando restaurantes…</p></Notice></main>
  if (error) page = <main><Notice>
    <p role="alert">{error}</p>
    <Button onClick={() => { setError(''); setAttempt(value => value + 1) }}>Tentar novamente</Button>
  </Notice></main>
  if (restaurants) page = <Routes>
    <Route path="/" element={<Home restaurants={restaurants} />} />
    <Route path="/restaurantes/:id" element={<Restaurant restaurants={restaurants} />} />
    <Route path="*" element={<main><Notice><h1>Página não encontrada</h1><Link to="/">Voltar ao início</Link></Notice></main>} />
  </Routes>

  return <><Global />{page}<Footer><Brand /><p>O efood é uma plataforma de divulgação de restaurantes. A responsabilidade pela entrega é do restaurante selecionado.</p></Footer></>
}

createRoot(document.getElementById('root')).render(<Provider store={store}><HashRouter><App /></HashRouter></Provider>)
