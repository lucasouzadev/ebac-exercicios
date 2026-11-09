const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const money = value => formatter.format(value)
