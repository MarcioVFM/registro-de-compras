import * as yup from 'yup'

export const schemaRegisterBuy = yup.object({
  name: yup.string().required('Informe o nome do produto'),
  description: yup.string().required('Informe a descrição do produto'),
  price: yup.string().required('Informe o valor do produto'),
  payday: yup.date().required('Informe a data da compra'),
  expireday: yup.date().required('Informe a data de vencimento'),
  status: yup.string().required('Informe o status do produto'),
})
